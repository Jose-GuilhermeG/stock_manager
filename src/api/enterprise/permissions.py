#imports
from rest_framework.permissions import BasePermission

from enterprise.enums import EmploymentRoles

class BasePermissionPerRole(
    BasePermission
):
    
    roles : list[EmploymentRoles.choices] | None = None
    
    def has_permission(self, request, view):
        return request.user.is_authenticated
    
    def __get_roles(self)->list[EmploymentRoles]:
        if not self.roles:
            raise NotImplementedError("Roles can't be none")
        
        if not len(self.roles):
            raise NotImplementedError("Roles must to have one item")
        
        return self.roles
            
    
    def has_object_permission(self, request, view, obj):
        return obj.employments.filter(user = request.user , role__in = self.__get_roles()).exists()

class IsEnterpriseOnwer(
    BasePermissionPerRole
):
    roles = [EmploymentRoles.OWNER]
    
class IsHighRole(
    BasePermissionPerRole
):
    roles = [EmploymentRoles.OWNER , EmploymentRoles.MANAGER , EmploymentRoles.ADMIN]
    
class IsEnterpriseEmployment(
    BasePermission
):
    
    def has_permission(self, request, view):
        return request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        return obj.employments.filter(user = request.user).first()
    