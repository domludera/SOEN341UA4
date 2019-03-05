from django.contrib import admin
from .models import Chirp
from .models import UserProfile

admin.site.register(Chirp)
admin.site.register(UserProfile)
