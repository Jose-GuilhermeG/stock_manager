#imports
from django.contrib import admin
from django.utils.translation import gettext_lazy as _

#models
from product.models import Product as ProductModel , Client as ClientModel , Order as OrderModel , OrderItem as OrderItemModel , ProductPhoto as ProductPhotoModel
from core.admin import BaseAdmin

#inlines
class OrderItemInline(admin.TabularInline):
    model = OrderItemModel
    fields = ["product" , "quantity"]
    extra = 1
    
class ProductPhotoInline(admin.TabularInline):
    model = ProductPhotoModel
    fields = ["photo"]
    extra = 1

# Register your models here.
@admin.register(ProductModel)
class ProductAdmin(BaseAdmin):
    list_display = ["name" , "price"]
    search_fields = ["name" , "description"]
    search_help_text = _("search product by name or description")
    inlines = [ProductPhotoInline]
    
@admin.register(ClientModel)
class ClientAdmin(BaseAdmin):
    pass

@admin.register(OrderModel)
class OrderAdmin(BaseAdmin):
    list_display = ["client" , "created_at"]
    inlines = [OrderItemInline]

@admin.register(OrderItemModel)
class OrderItemAmin(BaseAdmin):
    pass