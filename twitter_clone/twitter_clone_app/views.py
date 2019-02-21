from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from .models import Chirp
from django.views.generic import ListView
from .forms import HomeForm


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


# def home(request):
#     context = {
#         'title': 'Home page',
#         'chirpList': Chirp.objects.all(),
#     }
#     return render(request, 'twitter_clone_app/home.html', context)


class HomeView(ListView):
    model = Chirp
    template_name = 'twitter_clone_app/home.html'
    context_object_name = 'chirp'
    ordering = ['-date_posted']
    form = HomeForm

    def get(self, request):
        context = {
            'title': 'Home page',
            'chirpList': self.model.objects.all(),
            'form': self.form,
        }
        return render(request, self.template_name, context)


