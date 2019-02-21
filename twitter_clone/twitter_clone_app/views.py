from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm


def twitter(request):
    return render(request, 'twitter_clone_app/twitter.html')


def registration(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Welcome {username} !')
            return redirect('home')
    else:
        form = UserCreationForm()
    context = {
        'title': 'Registration page',
        'form': form,
    }
    return render(request, 'twitter_clone_app/registration.html', context)


def home(request):
    context = {
        'title': 'Home page',
    }
    return render(request, 'twitter_clone_app/home.html', context)
