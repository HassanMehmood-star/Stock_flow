from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Business, User, Product, Customer, Order, OrderItem, Ledger


class BusinessSignupSerializer(serializers.Serializer):
    business_name = serializers.CharField(max_length=255)
    owner_name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    phone = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)

    def validate_email(self, value):
        if Business.objects.filter(email=value).exists():
            raise serializers.ValidationError("Business with this email already exists.")
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email already exists.")
        return value

    def create(self, validated_data):
        business = Business.objects.create(
            business_name=validated_data['business_name'],
            owner_name=validated_data['owner_name'],
            email=validated_data['email'],
            phone=validated_data.get('phone', ''),
            address=validated_data.get('address', ''),
        )
        user = User.objects.create(
            business=business,
            username=validated_data['email'],  # username ko email se set kar rahe hain
            email=validated_data['email'],
            first_name=validated_data['owner_name'],
            password=make_password(validated_data['password']),
            role='owner',
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    business_name = serializers.CharField(source='business.business_name', read_only=True)
    plan = serializers.CharField(source='business.plan', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'role', 'business', 'business_name', 'plan']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['business']


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
        read_only_fields = ['business', 'total_due']


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'unit_price', 'subtotal']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    customer_name = serializers.CharField(source='customer.name', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'customer_name', 'items', 'total_amount',
                  'paid_amount', 'status', 'payment_status', 'order_date', 'delivery_date']
        read_only_fields = ['business', 'total_amount']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        business = self.context['request'].user.business

        order = Order.objects.create(business=business, **validated_data)

        total = 0
        for item_data in items_data:
            item_data['subtotal'] = item_data['quantity'] * item_data['unit_price']
            OrderItem.objects.create(order=order, **item_data)
            total += item_data['subtotal']

            # Stock kam karen
            product = item_data['product']
            product.current_stock -= item_data['quantity']
            product.save()

        order.total_amount = total
        order.save()

        # Customer ka total_due update karen agar unpaid hai
        if order.payment_status != 'paid':
            customer = order.customer
            customer.total_due += total - order.paid_amount
            customer.save()

        return order


class LedgerSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.name', read_only=True)

    class Meta:
        model = Ledger
        fields = '__all__'
        read_only_fields = ['business']