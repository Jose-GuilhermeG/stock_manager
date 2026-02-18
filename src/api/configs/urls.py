from django.contrib import admin
from django.urls import path , include
from drf_spectacular.views import SpectacularAPIView , SpectacularRedocView , SpectacularSwaggerView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('' , include(("product.urls","product"),namespace="product"))
]

urlpatterns += [
    path('docs/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('docs/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]