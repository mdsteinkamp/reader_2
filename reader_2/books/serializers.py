from rest_framework import serializers

from . import services, models
from characters import serializers as character_serializer
# from user import serializers as user_serializer


class BookSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()
    created_at = serializers.DateTimeField(read_only=True)
    completed = serializers.BooleanField()
    characters = character_serializer.CharacterSerializer(many=True, required=False)


    def to_internal_value(self, data):
        data = super().to_internal_value(data)

        return services.BookDataClass(**data)
    
    # class Meta:
    #     model = models.Book
    #     fields = ["title", "completed", "characters"]