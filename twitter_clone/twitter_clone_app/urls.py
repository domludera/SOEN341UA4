from django.urls import path, re_path
from .views import HomeView
from . import views

urlpatterns = [
    path('home/', HomeView.as_view(), name='home'),  # When user type /home, render the HomeView Class
    path('registration/', views.registration, name='registration'),  # /registration, render registration page
    re_path(r'^profile/(?P<username>[\w\-]+)/$', views.profile, name='profile'),  # render all users
]
