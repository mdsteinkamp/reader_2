from rest_framework import views, response, exceptions, permissions

from . import serializers as user_serializer
from . import services

class RegisterApi(views.APIView):

    def post(self, request):
        serializer = user_serializer.UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        serializer.instance = services.create_user(user_dc=data)

        print(data)

        return response.Response(data=serializer.data)
    
class LoginApi(views.APIView):

    def post(self, request):
        username = request.data("username")
        email = request.data("email")
        password = request.data("password")

        user = services.user_email_selector(email=email)

        if user is None:
            raise exceptions.AuthenticationFailed("Invalid Credentials")
        
        if not user.check_password(raw_password=password):
            raise exceptions.AuthenticationFailed("Invalid Credentials")
        
        
