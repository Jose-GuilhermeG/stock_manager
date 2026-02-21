from django.db import models
from django.utils.translation import gettext_lazy as _

class EmploymentRoles(models.TextChoices):
    OWNER = "O" , _("Owner")
    ADMIN = "A", _("Administrator")
    MANAGER = "M", _("Manager")
    STAFF = "S", _("Staff")
    VIEWER = "V", _("Viewer")