import dataclasses
import datetime
from typing import TYPE_CHECKING
from rest_framework import exceptions

from django.shortcuts import get_object_or_404

from books import services as book_services
from . import models as character_models

if TYPE_CHECKING:
    from models import Character
    from books.models import Book

@dataclasses.dataclass
class CharacterDataClass:
    name: str
    appearance: str
    locations: str
    associates: str
    position: str
    knowledge: str
    created_at: datetime.datetime = None
    book: book_services.BookDataClass = None
    id: int = None

    @classmethod
    def from_instance(cls, character_model:"Character") -> "CharacterDataClass":
        return cls(
            name=character_model.name,
            appearance=character_model.appearance,
            locations=character_model.locations,
            associates=character_model.associates,
            position=character_model.position,
            knowledge=character_model.knowledge,
            created_at=character_model.created_at,
            id=character_model.id,
            book=character_model.book
        )
    
def get_book_characters(book: "Book") -> list["CharacterDataClass"]:
    character_books = character_models.Character.characters.filter(book=book)
    
    return [CharacterDataClass.from_instance(character) for character in character_books]

def get_book_character_detail(character_id: int) -> "CharacterDataClass":
    character = get_object_or_404(character_models.Character, pk=character_id)

    return CharacterDataClass.from_instance(character_model=character)