from django.db import models
from django.contrib.auth import models as auth_models

class User(auth_models.AbstractUser):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)