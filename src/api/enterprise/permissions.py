#imports
from rest_framework.permissions import BasePermission

from enterprise.enums import EmploymentRoles

class IsEnterpriseOnwer(
    BasePermission
):
    def has_permission(self, request, view):
        return not request.user.is_anonymous
    
    def has_object_permission(self, request, view, obj):
        return obj.employments.filter(user = request.user).first().role == EmploymentRoles.OWNER