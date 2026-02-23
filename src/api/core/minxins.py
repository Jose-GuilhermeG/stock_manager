from typing import TypedDict
from rest_framework.permissions import BasePermission

class PermissionActionDict(TypedDict):
    list : BasePermission | None
    retrieve : BasePermission | None
    destroy : BasePermission | None
    create : BasePermission | None
    update : BasePermission | None
    partial_update : BasePermission | None

class ViewSetGetSerializerClassMixin:
    serializers_class_per_action = None
    serializer_class = None

    def get_serializers_classes_field(self):
        if not self.serializers_class_per_action:
            raise Exception(
                "You must set the 'serializers_classe_per_action' attribute or override the 'get_serializers_classes_field' method."
            )
        return self.serializers_class_per_action
    
    def get_serializer_class(self, *args, **kwargs):
        serializer_classes = self.get_serializers_classes_field()
        return serializer_classes.get(self.action , self.serializer_class)
    
class ViewSetAddPermissionPerActionMixin:
    permission_per_action : PermissionActionDict
    
    def get_permissions(self):
        default_permission = super().get_permissions()
        action_permission = self.permission_per_action.get(self.action,None)
        if action_permission:
            default_permission.append(action_permission())
        return default_permission