#imports
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView , RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from core.minxins import ViewSetGetSerializerClassMixin , ViewSetAddPermissionPerActionMixin
from enterprise.serializers import EnterpriseSerializer , StockItemSerializer
from enterprise.permissions import IsEnterpriseOnwer , IsEnterpriseEmploymentStock , IsEnterpriseHighRoleStock

#models
from enterprise.models import Enterprise , StockItem

# Create your views here.
class StockItemViewSet(
    ViewSetAddPermissionPerActionMixin,
    ModelViewSet,
):
    serializer_class = StockItemSerializer
    permission_classes = [IsEnterpriseEmploymentStock]
    permission_per_action = {
        'update' : IsEnterpriseHighRoleStock,
        'destroy' : IsEnterpriseHighRoleStock,
        'create' : IsEnterpriseHighRoleStock,
    }
    enterprise : Enterprise = None
    
    def get_enterprise(self) -> Enterprise :
        enterprise_id = self.kwargs.get("enterprise_id" , None)
        enterprise = Enterprise.objects.prefetch_related("stock_items","employments").get(pk = enterprise_id)
        self.enterprise = enterprise
        return self.enterprise
    
    def get_queryset(self):
        if not self.enterprise:
            self.get_enterprise()
        return self.enterprise.stock_items.all()
    
    