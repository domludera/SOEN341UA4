from django.shortcuts import render


def home(request):
    return render(request, 'twitter_clone_app/home.html')
