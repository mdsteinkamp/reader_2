from django.shortcuts import render
from rest_framework import views, response, permissions, status as rest_status
from rest_framework.permissions import SAFE_METHODS, BasePermission

from . import models
from . import services
from . import serializers as character_serializer

from user import authentication

class CharacterPermission(BasePermission):
    message = "can not do this"

    def has_object_permission(self, request, view, obj):

        print("in char perm class", obj.book, request.user)
        
        if request.method in SAFE_METHODS:
            return True
        
        return obj.book.user == request.user
        

class CharacterCreateListApi(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (CharacterPermission,)

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
    permission_classes = (CharacterPermission,)

    def get(self, request, character_id):
        character = services.get_book_character_detail(character_id=character_id)
        # print(character.book.user)
        # print(request.user)
        # if character.book.user != request.user:
        #     print(True)
        #     return response.Response(data="not authorized to view this character")
        
        serializer = character_serializer.CharacterSerializer(character)
        return response.Response(data=serializer.data)
    
    def delete(self, request, character_id):
        print(request.user.books.all())
        services.delete_character(user=request.user, character_id=character_id)
        return response.Response(data=rest_status.HTTP_204_NO_CONTENT)

    def put(self, request, character_id):
        serializer = character_serializer.CharacterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        character = serializer.validated_data
        serializer.instance = services.udpate_character(user=request.user, character_id=character_id, character_data=character)
        return response.Response(data=serializer.data)