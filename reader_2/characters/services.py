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
    
def get_user_characters(user):
    characters = character_models.Character.characters.filter(book__user=user)

    return [CharacterDataClass.from_instance(character) for character in characters]

    
def get_book_characters(book: "Book") -> list["CharacterDataClass"]:
    character_books = character_models.characters.filter(book=book)
    
    return [CharacterDataClass.from_instance(character) for character in character_books]

def get_book_character_detail(character_id: int) -> "CharacterDataClass":
    character = get_object_or_404(character_models.Character, pk=character_id)

    return CharacterDataClass.from_instance(character_model=character)

def create_character(book, character: "CharacterDataClass") -> "CharacterDataClass":
    print(book)
    create_character = character_models.Character.characters.create(
        name=character.name,
        appearance=character.appearance,
        locations=character.locations,
        associates=character.associates,
        position=character.position,
        knowledge=character.knowledge,
        book_id=book["id"],
    )

    return CharacterDataClass.from_instance(character_model=create_character)

def delete_character(user, character_id):
    character = get_object_or_404(character_models.Character, pk=character_id)
    print(character.book.user.id)

    if user.id != character.book.user.id:
        raise exceptions.PermissionDenied("You're not the user")

    character.delete()
    pass

def udpate_character(user, character_id, character_data):
    character = get_object_or_404(character_models.Character, pk=character_id)

    if user.id != character.book.user.id:
        raise exceptions.PermissionDenied("You're not the user")
    
    character.name = character_data.name
    character.appearance = character_data.appearance
    character.locations = character_data.locations
    character.associates = character_data.associates
    character.position = character_data.position
    character.knowledge = character_data.knowledge
    character.created_at = character.created_at
    character.id = character_id
    character.book = character.book
    print(character)
    character.save()
    
    return CharacterDataClass.from_instance(character_model=character)