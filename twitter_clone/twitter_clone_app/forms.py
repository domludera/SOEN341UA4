from django import forms


class HomeForm(forms.Form):
    chirp = forms.CharField(label='', required=False)
