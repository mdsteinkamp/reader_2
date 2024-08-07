from rest_framework import serializers

from characters import serializers as character_serializer
# from user import serializers as user_serializer

from . import services

class BookSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()
    created_at = serializers.DateTimeField(read_only=True)
    completed = serializers.BooleanField()
    characters = character_serializer.CharacterSerializer(many=True, read_only=True)


    def to_internal_value(self, data):
        data = super().to_internal_value(data)

        return services.BookDataClass(**data)