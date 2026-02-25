#imports
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView , RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from core.minxins import ViewSetGetSerializerClassMixin , ViewSetAddPermissionPerActionMixin 
from enterprise.minxins import SetGetEnterpriseMethodMixin
from enterprise.serializers import EnterpriseSerializer , StockItemSerializer
from enterprise.permissions import IsEnterpriseOnwer , IsEnterpriseEmployment , IsHighRole

#models
from enterprise.models import Enterprise , StockItem

# Create your views here.
class StockItemViewSet(
    ViewSetAddPermissionPerActionMixin,
    SetGetEnterpriseMethodMixin,
    ModelViewSet,
):
    serializer_class = StockItemSerializer
    permission_classes = [IsEnterpriseEmployment]
    permission_per_action = {
        'update' : IsHighRole,
        'destroy' : IsHighRole,
        'create' : IsHighRole,
    }
    enterprise : Enterprise = None
    
    def get_enterprise(self) -> Enterprise :
        enterprise_id = self.kwargs.get("enterprise_id" , None)
        query = Enterprise.objects.prefetch_related("stock_items","employments")
        enterprise = get_object_or_404(query , pk = enterprise_id)
        self.enterprise = enterprise
        return self.enterprise
    
    def get_queryset(self):
        if not self.enterprise:
            self.get_enterprise()
        return self.enterprise.stock_items.all()
    
    