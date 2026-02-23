from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from account.models import User as UserModel

# Register your models here.
@admin.register(UserModel)
class UserAdmin(BaseUserAdmin):
    list_display = ['username' , 'email']
    fieldsets = (
        (_("Personale infos") , {"fields" : ('username' , 'email' , 'photo' , 'password')}),
        (_("Permissions and groups") , {"fields" : ( "is_staff" , "is_superuser" , "user_permissions" , "groups")})
    )
    
    search_fields = ['username' , 'email']
    search_help_text = _("Search by name or email")