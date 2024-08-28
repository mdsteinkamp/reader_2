from rest_framework import views, response, permissions, status as rest_status
from rest_framework.permissions import SAFE_METHODS, BasePermission

from . import serializers as book_serializer
from . import services

from user import authentication

class BookPermission(BasePermission):
    message = "can not do this"

    def has_object_permission(self, request, view, obj):

        print("in perm class", obj.user, request.user)
        
        if request.method in SAFE_METHODS:
            return True
        
        return obj.user == request.user
        

        


class BookCreateListApi(views.APIView):
    # authentication_classes = (authentication.CustomBookAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = book_serializer.BookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data

        serializer.instance = services.create_book(user=request.user, book=data)

        return response.Response(data=serializer.data)

    def get(self, request):
        book_collection = services.get_user_books(user=request.user)
        serializer = book_serializer.BookSerializer(book_collection, many=True)
        return response.Response(data=serializer.data)
    
class BookRetrieveUpdateDelete(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)

    permission_classes = (BookPermission,)

    def get(self, request, book_id):
        # if not request.user.has_perm("books.view_book"):
        #     return response.Response(data="no luck")
        # user = request.user
        # book = user.books.all().get(id=book_id)
        # book = user.books.
        # book = books.services.get_user_book_detail(book_id=book_id)

        book = services.get_user_book_detail(book_id=book_id)
        # print(book.user)
        # print(request.user)
        # if book.user != request.user:
        #     print(True)
        #     return response.Response(data="not authorized to view this book")


        # characters = book.characters.all()
        # print(characters)
        # print(book)

        serializer = book_serializer.BookSerializer(book)
        # print(serializer.data)
        return response.Response(data=serializer.data)
    
    def delete(self, request, book_id):
        services.delete_book(user=request.user, book_id=book_id)
        return response.Response(data=rest_status.HTTP_204_NO_CONTENT)

    def put(self, request, book_id):
        serializer = book_serializer.BookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        book = serializer.validated_data
        serializer.instance = services.update_book(user=request.user, book_id=book_id, book_data=book)

        return response.Response(data=serializer.data)