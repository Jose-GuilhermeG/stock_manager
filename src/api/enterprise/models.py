from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

from core.models import BaseModel
from core.constants import MEDIUM_CHAR_LENGTH
from enterprise.enums import EmploymentRoles
from product.models import Product

USER = get_user_model()

# Create your models here.
class Enterprise(
    BaseModel
):
    name = models.CharField(
        verbose_name=_("Enterprise Name"),
        max_length=MEDIUM_CHAR_LENGTH,
        unique=True,
        null=False,
        blank=False
    )
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = _("Entreprise")
        verbose_name_plural = _("Entreprises")
        
    
class Employment(
    BaseModel
):
    enterprise = models.ForeignKey(
        verbose_name=_("Enterprise"),
        to=Enterprise,
        related_name="employments",
        on_delete=models.CASCADE,
        null=False,
        blank=False
    )
    
    user = models.ForeignKey(
        verbose_name=_("User"),
        to=USER,
        related_name="employments",
        on_delete=models.CASCADE,
        null=False,
        blank=False
    )
    
    role = models.CharField(
        verbose_name=_("Employment role"),
        max_length=1,
        null=False,
        blank=False,
        choices=EmploymentRoles.choices,
        default=EmploymentRoles.STAFF
    )
    
    def __str__(self):
        return f"{self.user.username} - {self.enterprise.name}"
    
    class Meta:
        verbose_name = _("Employment")
        verbose_name_plural = _("Employments")
        

class StockItem(BaseModel):
    product = models.OneToOneField(
        to=Product,
        on_delete=models.CASCADE,
        related_name="stock",
        verbose_name="product_id",
    )
    enterprise = models.ForeignKey(
        Enterprise,
        on_delete=models.CASCADE,
        related_name="stock_items",
        verbose_name="enterprise_id"
    )
    supplier_enterprise = models.ForeignKey(
        Enterprise,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="supplied_stock_items",
        verbose_name="supplier_enterprise_id"
    )
    default_quantity = models.PositiveIntegerField(
        verbose_name="default_quantity"
    )
    supplier_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="supplier_price"
    )
    
    def __str__(self):
        return self.product.name

    class Meta:
        verbose_name = "stock_item"
        verbose_name_plural = "stock_items"
        db_table = "stock_item"
        unique_together = ['product','enterprise']
