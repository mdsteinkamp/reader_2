from django.db import models
from django.contrib.auth import models as auth_models

class UserManager(auth_models.BaseUserManager):

    # def user_books(self):
    #     return self.book_set.all()

    def create_user(self, username: str, email: str, password: str = None, is_staff=False, is_superuser=False) -> "User":
        if not email:
            raise ValueError("User must have an email")
        if not username:
            raise ValueError("User must have username")
        
        user = self.model(email=self.normalize_email(email))
        user.username = username
        user.set_password(password)
        user.is_active = True
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        # user.user_books = []
        user.save()

        return user
    
    def create_superuser(self, username: str, email: str, password: str = None) -> "User":
        user = self.create_user(
            username=username,
            email=email,
            password=password,
            is_staff=True,
            is_superuser=True
        )
        user.save()

        return user

class User(auth_models.AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    # user_books = models.QuerySet()

    objects = UserManager()

    def __str__(self):
        return self.username