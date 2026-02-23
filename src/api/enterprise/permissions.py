#imports
from rest_framework.permissions import IsAuthenticated

from enterprise.enums import EmploymentRoles

class BasePermissionPerRole:
    roles : list[EmploymentRoles.choices] | None = None
    
    def _get_roles(self)->list[EmploymentRoles]:
        if not self.roles:
            raise NotImplementedError("Roles can't be none")
        
        if not len(self.roles):
            raise NotImplementedError("Roles must to have one item")
        
        return self.roles

class BaseEnterprisePermissionPerRole(
    IsAuthenticated,
    BasePermissionPerRole
):
    def has_object_permission(self, request, view, obj):
        return obj.employments.filter(user = request.user , role__in = self._get_roles()).exists()

class IsEnterpriseOnwer(
    BaseEnterprisePermissionPerRole
):
    roles = [EmploymentRoles.OWNER]
    
class IsHighRole(
    BaseEnterprisePermissionPerRole
):
    roles = [EmploymentRoles.OWNER , EmploymentRoles.MANAGER , EmploymentRoles.ADMIN]
    
class IsEnterpriseEmployment(
    IsAuthenticated
):  
    def has_object_permission(self, request, view, obj):
        return obj.employments.filter(user = request.user).exists()
    
class IsEnterpriseEmploymentStock(
    IsAuthenticated
):
    
    def has_permission(self, request, view):
        obj = view.get_enterprise()
        return super().has_permission(request, view) and obj.employments.filter(user = request.user).exists()

class BaseStockPermissionPerRole(
    BaseEnterprisePermissionPerRole,
    IsEnterpriseEmploymentStock
):
    
    def has_object_permission(self, request, view, obj):
        enterprise = view.get_enterprise()
        return super().has_object_permission(request, view, enterprise)
    
    
class IsEnterpriseHighRoleStock(
    BaseStockPermissionPerRole
):
    roles = [EmploymentRoles.OWNER , EmploymentRoles.MANAGER , EmploymentRoles.ADMIN]