class ViewSetGetSerializerClassMixin:
    serializers_class_per_action = None
    serializer_class = None

    def get_serializers_classes_field(self):
        if not self.serializers_class_per_action:
            raise Exception(
                "You must set the 'serializers_classe_per_action' attribute or override the 'get_serializers_classes_field' method."
            )
        return self.serializers_class_per_action
    
    def get_serializer_class(self, *args, **kwargs):
        serializer_classes = self.get_serializers_classes_field()
        return serializer_classes.get(self.action , self.serializer_class)