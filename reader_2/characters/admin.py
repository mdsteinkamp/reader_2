from django.contrib import admin

from . import models

class CahracterAdmin(admin.ModelAdmin):
    list_display = (
        "id", 
        "name", 
        "appearance", 
        "locations",
        "associates",
        "position",
        "knowledge"
    )

admin.site.register(models.Character, CahracterAdmin)