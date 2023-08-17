from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('kiosk/', views.kiosk, name='kiosk'),
    path('guide/', views.guide, name='guide'),
    path('simulator/', views.simulator, name='simulator'),
    path('quiz/', views.quiz, name='quiz'),
]
