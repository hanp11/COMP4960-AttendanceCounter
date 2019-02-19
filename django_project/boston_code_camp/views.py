from django.shortcuts import render
from django.http import HttpResponse

roomID = [
     {
     'roomName':'Room1'
     },
     {
     'roomName':'Room2'
     },
     {
     'roomName':'Room3'
     },
     {
     'roomName':'Room4'
     }
]

# Create your views here.
def index(requests):
     roomData = {
          'roomID' : roomID
     }
     return render(requests, 'boston_code_camp/index.html', roomData)

def rooms(requests):
     return render(requests, 'boston_code_camp/rooms.html')