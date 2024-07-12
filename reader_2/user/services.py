import dataclasses

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .models import User

@dataclasses.dataclass
class UserDataClass:
    username: str
    email: str
    password: str = None
    id: int = None

    @classmethod
    def from_instance(cls, user: "User") -> "UserDataClass":
        return cls(
            username = user.username,
            email = user.email,
            id = user.id
        )