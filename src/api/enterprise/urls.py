#imports
from django.urls import path
from rest_framework.routers import SimpleRouter

#views
from enterprise.views import enterprise_views , stock_views

stock_list = stock_views.StockItemViewSet.as_view({'get': 'list', 'post': 'create'}) 
stock_detail = stock_views.StockItemViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})

router = SimpleRouter()
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
    ),
    path(
        '<int:enterprise_id>/stock/', 
        stock_list, 
        name='enterprise-stock-list'
    ), 
    path(
        '<int:enterprise_id>/stock/<int:pk>/'
        , stock_detail, 
        name='enterprise-stock-detail'
    ),
]

urlpatterns += router.urls
