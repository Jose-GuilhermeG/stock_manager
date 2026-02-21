from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

from core.models import BaseModel
from core.constants import MEDIUM_CHAR_LENGTH
from enterprise.enums import EmploymentRoles

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