from rest_framework import views, response, exceptions, permissions

from . import serializers as user_serializer
from . import services, authentication
from . import models

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
        print(request)
        username = request.data["username"]
        password = request.data["password"]

        # user = services.user_email_selector(email=email)
        user = models.User.objects.filter(username=username).first()


        if user is None:
            raise exceptions.AuthenticationFailed("Invalid Credentials")
        
        if not user.check_password(raw_password=password):
            raise exceptions.AuthenticationFailed("Invalid Credentials")
        
        serializer = user_serializer.UserSerializer(user)
        
        token = services.create_token(user_id=user.id)

        resp = response.Response(serializer.data)

        resp.set_cookie(key='jwt', value=token, httponly=True)
        resp["jwt"] = token
        print(resp.headers)

        return resp
    
class UserApi(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user

        serializer = user_serializer.UserSerializer(user)

        return response.Response(serializer.data)
    
class LogoutAPI(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        resp = response.Response()
        resp.delete_cookie("jwt")
        resp.data = {"message": "see ya!"}

        return resp