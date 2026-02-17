#imports
from django.db import models
from django.core.validators import MinValueValidator
from core.models import BaseModel
from django.utils.translation import gettext_lazy as _
from core.constants import MEDIUM_CHAR_LENGTH

# Create your models here.
class Product(BaseModel):
    name = models.CharField(
        verbose_name=_("Product name"),
        max_length=MEDIUM_CHAR_LENGTH,
        null=False,
        blank=False,
        help_text=_(f"Product name can't be blank or null has a max length of {MEDIUM_CHAR_LENGTH}"),
        db_index=True
    )
    
    price = models.DecimalField(
        verbose_name=_("Product price"),
        max_digits=10,
        decimal_places=2,
        blank=False,
        null=False,
        validators=[
            MinValueValidator(
                limit_value=1,
                message=_("The price must be greater then 1")
            )
        ],
        help_text=_(f"Product price , decimal number , must be greater then 1 ")
    )
    
    description = models.TextField(
        verbose_name=_("Product description"),
        blank=True,
        null=True,
        help_text=_("Product description, can be blank or null")
    )
    
    quantity = models.IntegerField(
        verbose_name=_("Product quantity in stock"),
        blank=False,
        null=False,
        default=0,
        validators=[
            MinValueValidator(
                limit_value=0,
                message=_("product quantity can't be less then 0")
            )
        ],
        help_text=_("Product quantity in stock , integer , min : 0 ")
    )
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")
        ordering = ["created_at"]