import dataclasses
import datetime
from typing import TYPE_CHECKING
from rest_framework import exceptions

from django.shortcuts import get_object_or_404

from user import services as user_services
from . import models as book_models

if TYPE_CHECKING:
    from models import Book
    from user.models import User

@dataclasses.dataclass
class BookDataClass:
    title: str
    created_at: datetime.datetime = None
    user: user_services.UserDataClass = None
    id: int = None

    @classmethod
    def from_instance(cls, book_model:"Book") -> "BookDataClass":
        return cls(
            title=book_model.title,
            created_at=book_model.created_at,
            id=book_model.id,
            user=book_model.user
        )
    
def create_book(user, book: "BookDataClass") -> "BookDataClass":
    create_book = book_models.Book.objects.create(
        title=book.title,
        user=user,
    )

    return BookDataClass.from_instance(book_model=create_book)

def get_user_books(user: "User") -> list["BookDataClass"]:
    user_books = book_models.Book.objects.filter(user=user)
    
    return [BookDataClass.from_instance(book) for book in user_books]

def get_user_book_detail(book_id: int) -> "BookDataClass":
    book = get_object_or_404(book_models.Book, pk=book_id)

    return BookDataClass.from_instance(book_model=book)

def delete_book(user: "User", book_id: int) -> "BookDataClass":
    book = get_object_or_404(book_models.Book, pk=book_id)

    if user.id != book.user.id:
        raise exceptions.PermissionDenied("You're not the user")

    book.delete()

def update_book(user: "User", book_id: int, book_data: "BookDataClass") -> "BookDataClass":
    book = get_object_or_404(book_models.Book, pk=book_id)

    if user.id != book.user.id:
        raise exceptions.PermissionDenied("You're not the user")

    book.title = book_data.title
    book.save()
    return BookDataClass.from_instance(book_model=book)