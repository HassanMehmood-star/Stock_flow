from django.contrib import admin
from .models import Business, User, Product, Customer, Order, OrderItem, Ledger

admin.site.register(Business)
admin.site.register(User)
admin.site.register(Product)
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Ledger)