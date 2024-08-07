from rest_framework import serializers

# from user import serializers as user_serializer

from . import services

class CharacterSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    appearance = serializers.CharField()
    locations = serializers.CharField()
    associates = serializers.CharField()
    position = serializers.CharField()
    knowledge = serializers.CharField()
    created_at = serializers.DateTimeField(read_only=True)


    def to_internal_value(self, data):
        data = super().to_internal_value(data)

        return services.CharacterDataClass(**data)