from django.urls import path

from . import views

urlpatterns= [
    path("books/", views.BookCreateListApi.as_view(), name="books"),
    path("books/<int:book_id>/", views.BookRetrieveUpdateDelete.as_view(), name="book_detail")
]