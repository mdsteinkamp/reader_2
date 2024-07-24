from django.conf import settings
from rest_framework import authentication, exceptions
import jwt

from . import models, services

class CustomUserAuthentication(authentication.BaseAuthentication):

    def authenticate(self, request):
        # print(request.COOKIES)
        token = str(request.COOKIES.get("jwt"))
        print("initial auth token:", token)


        if not token:
            return None
        
        try:
            print('hello from auth method')
            # decoded_token = services.decode_token(decoded_token)
            # print(decoded_token)
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])

        except:
            raise exceptions.AuthenticationFailed("Unauthorized")
        
        user = models.User.objects.filter(id=payload["id"]).first()

        return (user, None)

