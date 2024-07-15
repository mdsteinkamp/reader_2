import dataclasses
import datetime
from typing import TYPE_CHECKING

from user import services as user_services
from . import models as book_models

if TYPE_CHECKING:
    from models import Book

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

    return BookDataClass.from_instance(book_models=create_book)