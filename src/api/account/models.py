from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from account.managers import CustomUserManager
from django.utils.translation import gettext_lazy as _

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        unique=True,
        verbose_name=_("email address"),
        help_text="Your email used to login"
    )
    username = models.CharField(
        max_length=150,
        unique=False,
        verbose_name=_("username"),
        help_text="Your username"
    )
    photo = models.ImageField(
        upload_to="users/photos/",
        blank=True,
        null=True,
        verbose_name=_("profile photo"),
        help_text="User profile photo"
    )
    is_active = models.BooleanField(default=True, verbose_name=_("is_active"))
    is_staff = models.BooleanField(default=False, verbose_name=_("is_staff"))

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        ordering = ["email"]

    def __str__(self):
        return self.email
