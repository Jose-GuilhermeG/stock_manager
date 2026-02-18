from django.urls import path
from rest_framework.routers import SimpleRouter
from product.views.product_views import ProductViewSet
from product.views.order_views import OrderViewSet

router = SimpleRouter()
router.register(
    prefix="products",
    viewset=ProductViewSet,
    basename="products"
)
router.register(
    "orders",
    viewset=OrderViewSet,
    basename="orders"
)

urlpatterns = [
    
]

urlpatterns += router.urls
