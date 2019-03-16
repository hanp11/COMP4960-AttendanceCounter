from django.contrib import admin
from .models import Room
from .models import Speaker
from .models import TimeSlot
from .models import Session

admin.site.register(Room)
admin.site.register(Speaker)
admin.site.register(TimeSlot)
admin.site.register(Session)