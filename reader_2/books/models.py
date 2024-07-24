from django.db import models
from django.conf import settings

class Book(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        verbose_name="user"
    )

    title = models.CharField(
        verbose_name="title",
        max_length=150,
    )

    completed = models.BooleanField(default=False)

    books = models.Manager()

    created_at = models.DateTimeField(auto_now_add=True)