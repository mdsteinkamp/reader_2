from django.shortcuts import render
from rest_framework import views, response, permissions, status as rest_status

from . import models
from . import services
from . import serializers as character_serializer

from user import authentication

class CharacterCreateListApi(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        # print(request.data["book"])
        serializer = character_serializer.CharacterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data

        serializer.instance = services.create_character(book=request.data["book"], character=data)

        return response.Response(data=serializer.data)

    def get(self, request):
        # print(request)
        character_collection = models.Character.characters.all()
        serializer = character_serializer.CharacterSerializer(character_collection, many=True)
        return response.Response(data=serializer.data)

class CharacterRetrieveUpdateDelete(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, character_id):
        character = services.get_book_character_detail(character_id=character_id)
        serializer = character_serializer.CharacterSerializer(character)
        return response.Response(data=serializer.data)
    
    # def delete(self, request, book_id):
    #     services.delete_book(user=request.user, book_id=book_id)
    #     return response.Response(data=rest_status.HTTP_204_NO_CONTENT)

    # def put(self, request, book_id):
    #     serializer = character_serializer.CharacterSerializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     book = serializer.validated_data
    #     serializer.instance = services.update_book(user=request.user, book_id=book_id, book_data=book)
    #     return response.Response(data=serializer.data)