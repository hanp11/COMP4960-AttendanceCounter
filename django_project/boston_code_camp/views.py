from django.shortcuts import render
from django.http import HttpResponse
from .models import Room
from .models import Speaker
from .models import TimeSlot
from .models import Session


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