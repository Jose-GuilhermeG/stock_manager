#imports
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _

#models
from product.models import Product , OrderItem , Order

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
        
class OrderItemSerializer(
    serializers.ModelSerializer
):
    product = ProductListSerializer()
    
    class Meta:
        model = OrderItem
        exclude = ["is_active" , "order"]
        read_only_fields = ["created_by" , "updated_by"]
        
class OrderItemCreateSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = OrderItem
        fields = ["product" , "quantity"]
        
class OrderSerializer(
    serializers.ModelSerializer
):  
    items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Order
        fields = ["id" ,"status","items"]
        
class OrderCreateSerializer(
    serializers.ModelSerializer
):
    items = OrderItemCreateSerializer(many=True)
    
    class Meta:
        model = Order
        fields = ["items"]
        
    def validate_items(self , list_orders : list[dict]):
        for order in list_orders:
            product : Product = order.get("product")
            order_quantity : int = order.get("quantity" , 1)
            if product.quantity < order_quantity:
                raise serializers.ValidationError(_(f"Product '{product.name}' quantity is less then order quantity"))
        return list_orders
        
    def create(self, validated_data):
        items = validated_data.pop("items")
        order = Order.objects.create(**validated_data)
        order.items.set([OrderItem(order=order,**product) for product in items],bulk=False)
        return order
    
class OrderUpdateSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = Order
        fields = ["status"]