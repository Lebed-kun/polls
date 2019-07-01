from django.contrib import admin
from .models import Poll, PollAnswer, Comment

# Register your models here.

admin.site.register(Poll)
admin.site.register(PollAnswer)
admin.site.register(Comment)