#imports
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView , RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from core.minxins import ViewSetGetSerializerClassMixin , ViewSetAddPermissionPerActionMixin
from enterprise.serializers import EnterpriseSerializer
from enterprise.permissions import IsEnterpriseOnwer , IsEnterpriseEmployment , IsHighRole

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
    
class EnterpriseViewSet(
    ViewSetAddPermissionPerActionMixin,
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
    
    def get_queryset(self):
        return Enterprise.objects.filter(
            employments__user = self.request.user
        )
        
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)