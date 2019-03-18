from django.urls import path, re_path
from .views import HomeView
from . import views

urlpatterns = [
    path('', views.twitter, name='twitter'),
    path('home/', HomeView.as_view(), name='home'),  # When user type /home, render the HomeView Class
    path('registration/', views.registration, name='registration'),  # /registration, render registration page
    path('users-profiles/', views.users_profiles, name='profiles'),  # /users-profiles, render all profiles.
    re_path(r'^users-profiles/(?P<username>[\w\-]+)/$', views.my_profile, name='test-profiles'),  # render all users
]
