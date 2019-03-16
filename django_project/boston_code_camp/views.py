from django.shortcuts import render
from django.http import HttpResponse
from .models import Room
from .models import Speaker
from .models import TimeSlot
from .models import Session

from django.views.generic import CreateView

# Create your views here.
def index(requests):
     Data = {
          'roomID' : Room.objects.all(),
          'speakerID' : Speaker.objects.all(),
          'timeslotID' : TimeSlot.objects.all(),
          'sessionID' : Session.objects.all()
     }
     return render(requests, 'boston_code_camp/index.html', Data)

def rooms(requests):
     return render(requests, 'boston_code_camp/rooms.html')

class RoomCreateView(CreateView):
     Data = {
          'roomID' : Room.objects.all(),
          'speakerID' : Speaker.objects.all(),
          'timeslotID' : TimeSlot.objects.all(),
          'sessionID' : Session.objects.all()
     }
     model = Room
     fields = ['RoomName', 'Capacity']
     success_url = '/'

class SpeakerCreateView(CreateView):
     model = Speaker
     fields = ['FirstName', 'LastName', 'Email']
     success_url = '/'

class TimeCreateView(CreateView):
     model = TimeSlot
     fields = ['StartTime', 'EndTime', 'Duration']
     success_url = '/'

class SessionCreateView(CreateView):
     model = Session
     fields = ['SessionName', 'RoomName','Speaker','TimeSlot']
     success_url = '/'