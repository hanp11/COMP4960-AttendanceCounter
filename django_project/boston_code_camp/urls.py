from django.urls import path
from . import views
from .views import RoomCreateView
from .views import SpeakerCreateView
from .views import TimeCreateView
from .views import SessionCreateView

urlpatterns = [
    path('', views.index, name='bcc-index'),
    path('rooms/', views.rooms, name='bcc-rooms'),
    path('new_room/',RoomCreateView.as_view(), name='room-create'),
    path('new_speaker/',SpeakerCreateView.as_view(), name='speaker-create'),
    path('new_time/',TimeCreateView.as_view(), name='time-create'),
    path('new_session/',SessionCreateView.as_view(), name='session-create'),
]