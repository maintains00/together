from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class UserForm(UserCreationForm):
    name = forms.CharField(max_length=5)
    age = forms.CharField(max_length=2)
    
    class Meta:
        model = User
        fields = ("name", "username", "age", "password1", "password2")