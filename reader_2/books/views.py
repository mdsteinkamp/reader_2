from rest_framework import views, response, permissions

from . import serializers as status_serializer

from user import authentication

class BookCreateListApi(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = status_serializer.StatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data

        #create a book
        pass

    def get(self, request):
        pass