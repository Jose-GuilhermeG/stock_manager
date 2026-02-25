from enterprise.models import Enterprise
from django.shortcuts import get_object_or_404

class SetGetEnterpriseMethodMixin:
    def get_enterprise(self):
        return get_object_or_404(Enterprise,
            pk = self.kwargs.get("enterprise_id") 
        )