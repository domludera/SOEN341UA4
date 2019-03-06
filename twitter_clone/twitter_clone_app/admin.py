from django.contrib import admin
from .models import Chirp
from .models import UserProfile

# Register the models into the frontend for our database

admin.site.register(Chirp)
admin.site.register(UserProfile)
