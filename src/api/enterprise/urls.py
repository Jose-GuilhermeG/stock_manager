#imports
from django.urls import path
from rest_framework.routers import SimpleRouter

#views
from enterprise.views import enterprise_views , stock_views

router = SimpleRouter()
router.register(
    'stock',
    viewset=stock_views.StockItemViewSet,
    basename="stockItems"
)
router.register(
    '',
    viewset=enterprise_views.EnterpriseViewSet,
    basename="enterprises"
)

urlpatterns = [
    path(
        "public/",
        view=enterprise_views.PublicEntrepriseList.as_view(),
        name="entreprise-public-list"
    ),
    path(
        "public/<int:pk>/",
        view=enterprise_views.PublicEnterpriseReative.as_view(),
        name="enterprise-public-detail"
    )
]

urlpatterns += router.urls
