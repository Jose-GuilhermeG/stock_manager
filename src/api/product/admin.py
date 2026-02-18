#imports
from django.contrib import admin
from django.utils.translation import gettext_lazy as _

#models
from product.models import Product as ProductModel , Client as ClientModel

# Register your models here.
@admin.register(ProductModel)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name" , "price"]
    search_fields = ["name" , "description"]
    search_help_text = _("search product by name or description")
    
@admin.register(ClientModel)
class ClientAdmin(admin.ModelAdmin):
    pass
