from django.shortcuts import render


def twitter(request):
    return render(request, 'twitter_clone_app/twitter.html')


def login(request):
    context = {
        'title': 'Login page',
    }
    return render(request, 'twitter_clone_app/login.html', context)


def home(request):
    context = {
        'title': 'Home page',
    }
    return render(request, 'twitter_clone_app/home.html', context)
