from django.urls import path
from .views import HomeView
from . import views

urlpatterns = [
    path('', views.twitter, name='twitter'),
    path('home/', HomeView.as_view(), name='home'),
    path('registration/', views.registration, name='registration'),
]
