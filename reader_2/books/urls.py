from django.urls import path

from . import views

urlpatterns= [
    path("books/", views.BookCreateListApi.as_view(), name="books")
]