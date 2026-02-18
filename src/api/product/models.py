#imports
from django.db import models
from django.core.validators import MinValueValidator
from core.models import BaseModel
from django.utils.translation import gettext_lazy as _
from core.constants import MEDIUM_CHAR_LENGTH
from django.contrib.auth import get_user_model

from product.enums import OrderStatus

USER = get_user_model()

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
        

        
class Client(
    BaseModel
):
    user = models.OneToOneField(
        verbose_name=_("Client user"),
        to=USER,
        related_name="client_profile",
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    
    def __str__(self):
        return self.user.username
    
    class Meta:
        verbose_name = _("Client")
        verbose_name_plural = _("Clients")
        
class Order(
    BaseModel
):
    status = models.CharField(
        verbose_name=_("Order status"),
        max_length=10,
        choices=OrderStatus.choices,
        default=OrderStatus.PENDING,
        null=False,
        blank=False,
    )
    
    client = models.ForeignKey(
        verbose_name=_("Client"),
        to=Client,
        related_name="orders",
        on_delete=models.CASCADE,
        null=False,
        blank=False
    )
    
    products = models.ManyToManyField(
        verbose_name=_("Products"),
        to=Product,
        related_name="orders",
        through="OrderItem"
    )

    def __str__(self):
        return f"{self.pk} - {self.client.__str__()}"
    
    class Meta:
        verbose_name = _("Order")
        verbose_name_plural = _("Orders")
        
class OrderItem(
    BaseModel
):
    order = models.ForeignKey(
        verbose_name=_("Order"),
        to=Order,
        related_name="items",
        on_delete=models.CASCADE,
        null=False,
        blank=False
    )
    
    product = models.ForeignKey(
        verbose_name=_("Product"),
        to=Product,
        related_name="items",
        on_delete=models.CASCADE,
        null=False,
        blank=False
    )
    
    quantity = models.IntegerField(
        verbose_name=_("Product quantity"),
        blank=False,
        null=False,
        default=1,
        validators=[
            MinValueValidator(
                limit_value=1,
                message=_("product quantity can't be less then 1")
            )
        ],
        help_text=_("Product quantity, integer , min : 1 ")
    )
    
    def __str__(self):
        return f"{self.product.name} - {self.order}"
    
    class Meta:
        verbose_name = _("Order item")
        verbose_name_plural = _("Order items")