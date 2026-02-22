#imports
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView , RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from core.minxins import ViewSetGetSerializerClassMixin
from enterprise.serializers import EnterpriseSerializer
from enterprise.permissions import IsEnterpriseOnwer

#models
from enterprise.models import Enterprise

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