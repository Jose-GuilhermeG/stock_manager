#imports
from rest_framework import serializers

#models
from product.models import Product

class ProductSerializer(
    serializers.ModelSerializer
):  
    
    class Meta:
        model = Product
        exclude = ["is_active"]
        read_only_fields = ["created_by","updated_by"]
        
class ProductListSerializer(
    serializers.ModelSerializer
):
    
    product_detail_url = serializers.HyperlinkedIdentityField(
        view_name = "product:products-detail",
        lookup_field = "pk"
    )
    
    class Meta:
        model = Product
        fields = ["id" , "name" , "price" , "product_detail_url"]