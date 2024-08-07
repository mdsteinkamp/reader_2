from django.urls import path

from . import views

urlpatterns= [
    path("characters/", views.CharacterCreateListApi.as_view(), name="characters"),
    path("characters/<int:character_id>/", views.CharacterRetrieveUpdateDelete.as_view(), name="character_detail")
]