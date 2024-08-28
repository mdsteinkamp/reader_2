from django.conf import settings
from rest_framework import authentication, exceptions
from rest_framework.permissions import SAFE_METHODS
import jwt

from . import models, services

class CustomUserAuthentication(authentication.BaseAuthentication):

    def authenticate(self, request):
        token = str(request.COOKIES.get("jwt"))


        if not token:
            return None
        
        try:
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])

        except:
            raise exceptions.AuthenticationFailed("Unauthorized")
        
        user = models.User.objects.filter(id=payload["id"]).first()

        return (user, None)
    
    def has_permission(self, request, user):
        token = str(request.COOKIES.get("jwt"))


        if not token:
            return None
        
        try:
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])

        except:
            raise exceptions.AuthenticationFailed("Unauthorized")
        
        user = models.User.objects.filter(id=payload["id"]).first()
        print(user)

        if user:
            return True


    def has_object_permission(self, request, view, obj):

        print("in char perm class", obj.book, request.user)
        
        if request.method in SAFE_METHODS:
            return True
        
        return obj.book.user == request.user