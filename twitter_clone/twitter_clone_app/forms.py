from django import forms
from .models import Chirp


# Create a form, when this form will be POST, it will be possible to update the model associated with it.

class HomeForm(forms.ModelForm):
    tweet_text = forms.CharField(label='', required=False, widget=forms.TextInput(attrs={'class':'form-control','placeholder':'What\'s happening?'}))

    class Meta:
        model = Chirp  # Model associated with the form.
        fields = ('tweet_text',)
