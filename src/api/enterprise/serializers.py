#imports
from rest_framework import serializers

#models
from enterprise.models import Enterprise , Employment , StockItem
from enterprise.enums import EmploymentRoles

#serializers
class EnterpriseSerializer(
    serializers.ModelSerializer
):
    owner = serializers.SerializerMethodField()
    detail_url = serializers.HyperlinkedIdentityField(
        view_name = "enterprise:enterprise-public-detail",
        lookup_field = "pk"
    )
    
    def get_owner(self , obj : Enterprise)->str:
        query = obj.employments.filter(role=EmploymentRoles.OWNER).first()
        if query: return query.user.username
        return "unknow"
    
    class Meta:
        model = Enterprise
        fields = ["name","owner","detail_url"]
        
    def create(self, validated_data : dict):
        user = validated_data.pop("user")
        enterprise = super().create(validated_data)
        Employment.objects.create(
            user = user,
            enterprise = enterprise,
            role = EmploymentRoles.OWNER
        )
        
        return enterprise
    
class StockItemSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = StockItem
        fields = "__all__"