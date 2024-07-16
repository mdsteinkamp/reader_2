from django.contrib import admin

from . import models

class BookAdmin(admin.ModelAdmin):
    list_display = (
        "id", 
        "title"
    )

admin.site.register(models.Book, BookAdmin)