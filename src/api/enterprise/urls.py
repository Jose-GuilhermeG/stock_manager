#imports
from django.urls import path
from rest_framework.routers import SimpleRouter

#views
from enterprise import views

router = SimpleRouter()


urlpatterns = [
    path(
        "public/",
        view=views.PublicEntrepriseList.as_view(),
        name="entreprise-public-list"
    ),
    path(
        "public/<int:pk>/",
        view=views.PublicEnterpriseReative.as_view(),
        name="enterprise-public-detail"
    )
]

urlpatterns += router.urls
