from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView , TokenVerifyView


urlpatterns = [
    path(
        'login/',
        view=TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),
    path(
        'token/refresh/',
        view=TokenRefreshView.as_view(),
        name='token_refresh'
    ),
    path(
        'token/verify/',
        view=TokenVerifyView.as_view(),
        name='token_verify'
    )
]
