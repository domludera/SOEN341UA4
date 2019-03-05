from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import get_object_or_404
from .models import Chirp
from django.views.generic import ListView
from .forms import HomeForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.admin import User
from .models import UserProfile


def twitter(request):
    return render(request, 'twitter_clone_app/profile.html')


def registration(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            fresh_user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Welcome {username} !')
            fresh_user = authenticate(username=form.cleaned_data['username'],
                                      password=form.cleaned_data['password1'],
                                      )
            login(request, fresh_user)
            return redirect('home')
    else:
        form = UserCreationForm()
    context = {
        'title': 'Registration page',
        'form': form,
    }
    return render(request, 'twitter_clone_app/registration.html', context)


def profile(request):
    context = {
        'chirpList': Chirp.objects.all()
    }
    return render(request, 'twitter_clone_app/profile.html', context)


def profiles(request):
    if request.method == 'POST':
        user = get_object_or_404(UserProfile, id=request.POST.get('follow'))
        if user.followers.filter(id=request.user.id).exists():
            user.followers.remove(request.user)
        else:
            user.followers.add(request.user)
        return redirect('profiles')
    context = {
        'user_profile_list': User.objects.all(),
    }
    return render(request, 'twitter_clone_app/profiles.html', context)


class HomeView(ListView):
    model = Chirp
    template_name = 'twitter_clone_app/home.html'
    context_object_name = 'chirp'
    form = HomeForm

    def get(self, request):
        context = {
            'title': 'Home page',
            'chirpList': self.model.objects.all(),
            'form': self.form,
        }
        return render(request, self.template_name, context)

    def post(self, request):
        if 'post' in request.POST:
            form = HomeForm(request.POST)
            if form.is_valid():
                chirp = form.save(commit=False)
                chirp.author = request.user
                chirp.save()
                return redirect('home')
            context = {
                'title': 'Home page',
                'chirpList': self.model.objects.all(),
                'form': self.form,
            }
            return render(request, self.template_name, context)
        elif 'chirp' in request.POST:
            chirp_liked = get_object_or_404(Chirp, id=request.POST.get('chirp'))
            if chirp_liked.likes.filter(id=request.user.id).exists():
                chirp_liked.likes.remove(request.user)
            else:
                chirp_liked.likes.add(request.user)

            return redirect('home')
