from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

from enterprise.serializers import EnterpriseSerializer
from enterprise.models import Enterprise


# Create your views here.
class ListUserEnterprises(
    ListAPIView
):
    serializer_class = EnterpriseSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Enterprise.objects.filter(employments__user = self.request.user)