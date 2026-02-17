#imports
from rest_framework import serializers

#models
from product.models import Product

class ProductSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = Product
        fields = "__all__"