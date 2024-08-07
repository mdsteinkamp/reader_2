from django.db import models

from books import models as book_model

class Character(models.Model):
    book= models.ForeignKey(
        book_model.Book,
        on_delete=models.CASCADE,
        verbose_name="book", 
        related_name="characters"
    )

    name = models.TextField()
    appearance = models.TextField()
    locations = models.TextField()
    associates = models.TextField()
    position = models.TextField()
    knowledge = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    characters = models.Manager()