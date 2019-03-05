from django.urls import path
from .views import HomeView
from . import views

urlpatterns = [
    path('', views.twitter, name='twitter'),
    path('home/', HomeView.as_view(), name='home'),  # When user type /home, render the HomeView Class
    path('registration/', views.registration, name='registration'),  # /registration, render registration page
    path('my-profile/', views.my_profile, name='profile'),  # /profile, render their profile
    path('users-profiles/', views.users_profiles, name='profiles'),  # /profiles, render all profiles.
]
