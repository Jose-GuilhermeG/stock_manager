#imports
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView , RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from core.minxins import ViewSetGetSerializerClassMixin
from enterprise.serializers import EnterpriseSerializer , StockItemSerializer
from enterprise.permissions import IsEnterpriseOnwer

#models
from enterprise.models import Enterprise , StockItem

# Create your views here.
class StockItemViewSet(
    ModelViewSet
):
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer