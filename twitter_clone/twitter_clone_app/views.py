from django.shortcuts import render


def twitter(request):
    return render(request, 'twitter_clone_app/twitter.html')


def login(request):
    return render(request, 'twitter_clone_app/login.html')


def home(request):
    return render(request, 'twitter_clone_app/home.html')
