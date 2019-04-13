from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import get_object_or_404
from django.views.generic import ListView
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth.admin import User
from django.http import HttpResponseRedirect
from .models import UserProfile
from .forms import HomeForm
from .models import Chirp


def login(request):
    return HttpResponseRedirect('/login/')


def registration(request):
    if request.method == 'POST':  # if method request is POST, enter this if statement
        form = UserCreationForm(request.POST)
        if form.is_valid():  # If form is valid, will enter this if statement
            fresh_user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Welcome {username} !')  # Welcome message when user -> home
            fresh_user = authenticate(username=form.cleaned_data['username'],  # Authenticate
                                      password=form.cleaned_data['password1'],
                                      )
            auth_login(request, fresh_user)  # Login the user, so there is no conflict
            return redirect('home')  # Redirect to home.html
    else:
        form = UserCreationForm()
    context = {
        'title': 'Chirp | Registration',
        'form': form,
    }
    return render(request, 'twitter_clone_app/registration.html', context)


def profile(request, username):
    user_requested = User.objects.get(username=username)
    context = {
        'user_requested': user_requested,
        'chirpList': Chirp.objects.all(),  # Take all the Chirp object from the database
        'title': 'Chirp |'+user_requested.username,
        'chirpListLiked': Chirp.objects.filter(likes__id=user_requested.id),
        'userProfileFollowed': UserProfile.objects.filter(followers__id=request.user.id),
        'chirpListPosted': Chirp.objects.filter(author__id=user_requested.id),
    }
    if 'follow' in request.POST:
        user = get_object_or_404(UserProfile, id=request.POST.get('follow'))  # get Models = POST
        if user.followers.filter(id=request.user.id).exists():
            user.followers.remove(request.user)  # If users exist, remove it from list
        else:
            user.followers.add(request.user)  # If users doesn't exist, add it to the list
        return render(request, 'twitter_clone_app/profile.html', context)
    elif 'chirp' in request.POST:
        chirp_liked = get_object_or_404(Chirp, id=request.POST.get('chirp'))
        if chirp_liked.likes.filter(id=request.user.id).exists():
            chirp_liked.likes.remove(request.user)  # If user exists, remove it from db
        else:
            chirp_liked.likes.add(request.user)  # If user doesn't exist, add it to the db
        return render(request, 'twitter_clone_app/profile.html', context)
    return render(request, 'twitter_clone_app/profile.html', context)


class HomeView(ListView):
    model = Chirp
    template_name = 'twitter_clone_app/home.html'
    context_object_name = 'chirp'
    form = HomeForm

    def get(self, request):  # If GET, enter this function
        context = {
            'title': 'Chirp | Homepage',
            'chirpList': self.model.objects.all(),
            'chirpListLiked': self.model.objects.filter(likes__id=request.user.id),
            'form': self.form,
            'chirpListPosted': self.model.objects.filter(author__id=request.user.id),
        }
        return render(request, self.template_name, context)

    def post(self, request):  # If POST, enter this function
        if 'post' in request.POST:  # If user send a post
            form = HomeForm(request.POST)
            if form.is_valid():
                chirp = form.save(commit=False)
                chirp.author = request.user
                chirp.save()  # Add it to the databases
                return redirect('home')
            context = {
                'title': 'Chirp | Homepage',
                'chirpList': self.model.objects.all(),
                'chirpListLiked': self.model.objects.filter(likes__id=request.user.id),
                'form': self.form,
                'chirpListPosted': self.model.objects.filter(author__id=request.user.id),
            }
            return render(request, self.template_name, context)
        elif 'chirp' in request.POST:  # if POST method concerns the chirp itself
            chirp_liked = get_object_or_404(Chirp, id=request.POST.get('chirp'))
            if chirp_liked.likes.filter(id=request.user.id).exists():
                chirp_liked.likes.remove(request.user)  # If user exists, remove it from db
            else:
                chirp_liked.likes.add(request.user)  # If user doesn't exist, add it to the db

            return redirect('home')
