from django.contrib import admin

from enterprise.models import Employment as EmploymentModel , Enterprise as EnterpriseModel
from core.admin import BaseAdmin

# Register your models here.
@admin.register(EnterpriseModel)
class EnterpriseAdmin(BaseAdmin):
    list_display = ['name' , 'created_at']

@admin.register(EmploymentModel)
class EmploymentAdmin(BaseAdmin):
    pass
