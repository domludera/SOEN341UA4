from django import forms
from .models import Chirp


class HomeForm(forms.ModelForm):
    tweet_text = forms.CharField(label='', required=False)

    class Meta:
        model = Chirp
        fields = ('tweet_text',)
