#imports
from rest_framework.viewsets import ModelViewSet
from product.models import Order, Client
from product.serializers import OrderSerializer , OrderCreateSerializer , OrderUpdateSerializer
from core.minxins import ViewSetGetSerializerClassMixin

class OrderViewSet(
    ViewSetGetSerializerClassMixin,
    ModelViewSet
):
    queryset = Order.objects.all()
    http_method_names = ["get","post","put","delete"]
    serializer_class = OrderSerializer
    serializers_class_per_action = {
        "create" : OrderCreateSerializer,
        "partial_update" : OrderUpdateSerializer,
        "update" : OrderUpdateSerializer
    }
    
    def perform_create(self, serializer):
        serializer.save(
            client=Client.objects.get(id=1),
        )
