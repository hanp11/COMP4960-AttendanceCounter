from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='bcc-index'),
    path('rooms/', views.rooms, name='bcc-rooms'),
]