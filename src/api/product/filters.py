from django_filters import filters , FilterSet
from product.models import Product

class ProductFilter(FilterSet):
    name = filters.CharFilter(
        field_name='name',
        lookup_expr="icontains"
    )
    
    price_gt = filters.NumberFilter(
        field_name="price",
        lookup_expr="gt"
    )
    price_lt = filters.NumberFilter(
        field_name="price",
        lookup_expr="lt"
    )
    
    
    class Meta:
        model = Product
        fields = []