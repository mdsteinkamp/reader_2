import dataclasses
import datetime
from typing import TYPE_CHECKING

from user import services as user_services

if TYPE_CHECKING:
    from models import Status

@dataclasses.dataclass
class BookDataClass:
    title: str
    created_at: datetime.datetime = None
    user: user_services.UserDataClass = None
    id: int = None

    @classmethod
    def from_instance(cls, book_model:"Book"): -> "BookDataClass":
        return cls(
            title=book_model.content,
            created_at=book_model.created_at,
            id=book_model.id,
            user=book_model.user
        )