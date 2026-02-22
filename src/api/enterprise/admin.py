from django.contrib import admin

from enterprise.models import Employment as EmploymentModel , Enterprise as EnterpriseModel , StockItem as StockItemModel
from core.admin import BaseAdmin

# Register your models here.
@admin.register(EnterpriseModel)
class EnterpriseAdmin(BaseAdmin):
    list_display = ['name' , 'created_at']

@admin.register(EmploymentModel)
class EmploymentAdmin(BaseAdmin):
    pass

@admin.register(StockItemModel)
class EtockItemAdmin(BaseAdmin):
    pass
