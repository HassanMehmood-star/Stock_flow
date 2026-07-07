from django.contrib.auth.models import AbstractUser
from django.db import models


class Business(models.Model):
    PLAN_CHOICES = [('free', 'Free'), ('basic', 'Basic'), ('premium', 'Premium')]

    business_name = models.CharField(max_length=255)
    owner_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    plan = models.CharField(max_length=10, choices=PLAN_CHOICES, default='free')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.business_name


class User(AbstractUser):
    ROLE_CHOICES = [('owner', 'Owner'), ('staff', 'Staff')]

    email = models.EmailField(unique=True)
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='staff')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  


class Product(models.Model):
    UNIT_CHOICES = [('roll', 'Roll'), ('meter', 'Meter'), ('sheet', 'Sheet'), ('piece', 'Piece')]

    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100, blank=True)
    color = models.CharField(max_length=50, blank=True)
    width = models.FloatField(null=True, blank=True)
    grade = models.CharField(max_length=100, blank=True)
    unit = models.CharField(max_length=10, choices=UNIT_CHOICES, default='roll')
    cost_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    sell_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    retail_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    current_stock = models.IntegerField(default=0)
    low_stock_threshold = models.IntegerField(default=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.business.business_name})"


class Customer(models.Model):
    TYPE_CHOICES = [('wholesale', 'Wholesale'), ('retail', 'Retail')]

    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='customers')
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    customer_type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='retail')
    total_due = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS_CHOICES = [('pending', 'Pending'), ('delivered', 'Delivered'), ('cancelled', 'Cancelled')]
    PAYMENT_CHOICES = [('unpaid', 'Unpaid'), ('partial', 'Partial'), ('paid', 'Paid')]

    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='orders')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    payment_status = models.CharField(max_length=10, choices=PAYMENT_CHOICES, default='unpaid')
    order_date = models.DateTimeField(auto_now_add=True)
    delivery_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Order #{self.id} - {self.customer.name}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)


class Ledger(models.Model):
    TYPE_CHOICES = [('debit', 'Debit'), ('credit', 'Credit')]

    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='ledgers')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='ledgers')
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)
    type = models.CharField(max_length=6, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.CharField(max_length=255, blank=True)
    date = models.DateTimeField(auto_now_add=True)