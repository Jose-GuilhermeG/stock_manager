#imports
from rest_framework.viewsets import ModelViewSet
from product.serializers import ProductSerializer , ProductListSerializer
from product.models import Product

from core.minxins import ViewSetGetSerializerClassMixin
from product.filters import ProductFilter

# Create your views here.

class ProductViewSet(
    ViewSetGetSerializerClassMixin,
    ModelViewSet
):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    serializers_class_per_action = {
        "list" : ProductListSerializer
    }
    filterset_class = ProductFilter