import dataclasses
import datetime
import jwt

from typing import TYPE_CHECKING

from django.conf import settings

from . import models

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
    
def create_user(user_dc: "UserDataClass") -> "UserDataClass":
    instance = models.User(
        username = user_dc.username,
        email = user_dc.email,
    )
    if user_dc.password is not None:
        instance.set_password(user_dc.password)

    instance.save()

    return UserDataClass.from_instance(instance)

def user_email_selector(email: str) -> "User":
    user = models.User.objects.filter(email=email).first()

    return user

def create_token(user_id: int) -> str:
    payload = dict(
        id=user_id,
        exp=datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=24),
        iat=datetime.datetime.now(datetime.UTC)
    )

    token = jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")

    return token