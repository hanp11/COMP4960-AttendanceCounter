from django.db import models

# Create your models here.

class Room(models.Model):
    RoomName = models.CharField(max_length=100)
    Capacity = models.CharField(max_length=15)
    def __str__(self):
        return "%s" % (self.RoomName)

class Speaker(models.Model):
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    Email = models.EmailField()
    def __str__(self):
        return "%s %s" % (self.FirstName, self.LastName)

class TimeSlot(models.Model):
    StartTime = models.TimeField()
    EndTime = models.TimeField()
    Duration = models.CharField(max_length=15)
    def __str__(self):
        return "%s-%s" % (self.StartTime, self.EndTime)

class Session(models.Model):
    SessionName = models.CharField(max_length=200)
    RoomName = models.ForeignKey(Room, on_delete=models.CASCADE)
    Speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE)
    TimeSlot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
