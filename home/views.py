from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib import auth
from .forms import UserForm
from django.contrib.auth import authenticate, login

def index(request):
    return render(request, 'home/index.html')


@csrf_exempt

def signin(request):
    if request.method == "POST":
        form = UserForm(request.POST)
        if request.POST['password1'] == request.POST['password2']:
            user = User.objects.create_user(
                username=request.POST['username'],
                password=request.POST['password1']
            )
            auth.login(request, user)
            return redirect('index')
        else:
            form = UserForm()
    return render(request, 'home/login/signin_1920.html')

# def login(request):
#     return render(request, 'home/login/login_1920.html')