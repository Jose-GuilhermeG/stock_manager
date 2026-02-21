from django.contrib import admin
from django.utils.translation import gettext_lazy as _

class BaseAdmin(admin.ModelAdmin):
    readonly_fields = ["created_at" ,"created_by" ,"updated_at" , "is_active"]
    list_per_page = 10
    
    

admin.site.site_header = _("stock manager admin")
