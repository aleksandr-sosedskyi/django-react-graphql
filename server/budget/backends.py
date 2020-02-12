from django.contrib.auth.backends import BaseBackend
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password


class MyModelBackend(BaseBackend):
    def authenticate(self, login=None, password=None):
        UserModel = get_user_model()
        if login:
            user = UserModel.objects.filter(Q(email=login) | Q(username=login) | Q(phone=login))
            if user:
                if user.first().check_password(password):
                    return user
                else:
                    return None
            return None
        return None
    
    def get_user(self, user_id):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(pk=user_id)
            return user
        except Exception:
            None

            

