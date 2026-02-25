#imports
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView , RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.utils.timezone import localtime
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from datetime import datetime


from core.minxins import ViewSetGetSerializerClassMixin , ViewSetAddPermissionPerActionMixin
from enterprise.serializers import EnterpriseSerializer
from enterprise.permissions import IsEnterpriseOnwer , IsEnterpriseEmployment , IsHighRole
from product.enums import OrderStatus
from product.models import Order , OrderItem
from enterprise.minxins import SetGetEnterpriseMethodMixin

#models
from enterprise.models import Enterprise , StockItem

# Create your views here.
class PublicEntrepriseList(
    ListAPIView,
):
    queryset = Enterprise.objects.all()
    serializer_class = EnterpriseSerializer
    
class PublicEnterpriseReative(
    RetrieveAPIView
):
    queryset = Enterprise.objects.all()
    serializer_class = EnterpriseSerializer
    
class EnterpriseViewSet(
    ViewSetAddPermissionPerActionMixin,
    SetGetEnterpriseMethodMixin,
    ModelViewSet,
):
    serializer_class = EnterpriseSerializer
    permission_class = [IsAuthenticated]
    permission_per_action = {
        'retrieve' : IsEnterpriseEmployment,
        'destroy' : IsEnterpriseOnwer,
        'update' : IsHighRole,
        'create' : IsAuthenticated
    }
    
    def get_enterprise(self):
        queryset = self.filter_queryset(self.get_queryset())
        enterprise_id = self.kwargs.get("pk")
        obj = get_object_or_404(queryset , pk = enterprise_id )
        return obj
    
    def get_object(self):
        obj = self.get_enterprise()
        self.check_object_permissions(self.request , obj)
        return obj
            
    def get_queryset(self):
        return Enterprise.objects.filter(
            employments__user = self.request.user
        )
    
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
    
class ShowSellAvg(
    APIView,
    SetGetEnterpriseMethodMixin
):
    http_method_names = ['get']
    permission_classes = [IsEnterpriseEmployment]
    
    def get_dates(self) -> tuple[datetime , datetime]:
        today = localtime(timezone.now())
        first_day = today.replace(day=1)
        return today , first_day
    
    def get_time_interval(self , started : datetime , finishi : datetime) -> int :
        return (finishi - started).days + 1
    
    def get_queryset(self , **filters):
        return OrderItem.objects.filter(**filters)
    
    def get(self , request , enterprise_id):
        ordersQuantity = 0
        today , first_day = self.get_dates()
        days_passed =  self.get_time_interval(first_day , today)
        query = self.get_queryset(
            order__status = OrderStatus.COMPLETED , 
            product__stock__enterprise__id = enterprise_id , 
            created_at__range=(first_day , today) )
        for item in query: ordersQuantity += item.quantity
        orderAvg = round(ordersQuantity / days_passed , 2)
        return Response(orderAvg)