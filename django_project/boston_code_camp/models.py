from django.db import models

# Create your models here.

class Room(models.Model):
    RoomName = models.CharField(max_length=100)
    Capacity = models.CharField(max_length=15)

class Speaker(models.Model):
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    Email = models.CharField(max_length=100)

class TimeSlot(models.Model):
    StartTime = models.CharField(max_length=15)
    EndTime = models.CharField(max_length=15)
    Duration = models.CharField(max_length=15)

class Session(models.Model):
    SessionName = models.CharField(max_length=200)
    RoomName = models.CharField(max_length=100)
    Speaker = models.CharField(max_length=100)
    TimeSlot = models.CharField(max_length=100)
