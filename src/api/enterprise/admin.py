from django.contrib import admin

from enterprise.models import Employment as EmploymentModel , Enterprise as EnterpriseModel

# Register your models here.
@admin.register(EnterpriseModel)
class EnterpriseAdmin(admin.ModelAdmin):
    list_display = ['name' , 'created_at']

@admin.register(EmploymentModel)
class EmploymentAdmin(admin.ModelAdmin):
    pass
