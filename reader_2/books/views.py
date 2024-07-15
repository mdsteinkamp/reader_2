from rest_framework import views, response, permissions

from . import serializers as book_serializer
from . import services

from user import authentication

class BookCreateListApi(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = book_serializer.BookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data

        serializer.instance = services.create_book(user=request.user, book=data)

        return response.Response(data=serializer.data)

    def get(self, request):
        return response.Response(data="hello")