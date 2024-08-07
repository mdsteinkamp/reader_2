from rest_framework import serializers

from . import services

class UserSerializer(serializers.Serializer):
    # user_books = serializers.SerializerMethodField()

    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def to_internal_value(self, data):
        data = super().to_internal_value(data)

        return services.UserDataClass(**data)