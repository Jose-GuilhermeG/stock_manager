from django.urls import path
from rest_framework.routers import SimpleRouter
from product.views import ProductViewSet

router = SimpleRouter()
router.register(
    prefix="",
    viewset=ProductViewSet,
    basename="products"
)

urlpatterns = [
    
]

urlpatterns = router.urls
