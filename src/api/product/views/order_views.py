#imports
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from product.models import Order, Client
from product.serializers import OrderSerializer , OrderCreateSerializer , OrderUpdateSerializer
from core.minxins import ViewSetGetSerializerClassMixin
from product.enums import OrderStatus
from django.utils.timezone import localtime
from django.utils import timezone

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

@api_view()
def ShowSellAvg(request) :
    ordersQuantity =0
    today = localtime(timezone.now())
    first_day = today.replace(day=1)
    days_passed = (today - first_day).days + 1
    for order in  Order.objects.filter(status = OrderStatus.COMPLETED , created_at__range=(first_day , today)).prefetch_related("items"):
        for item in order.items.all():
            ordersQuantity += item.quantity
    orderAvg = round(ordersQuantity / days_passed , 2)
    return Response(orderAvg)