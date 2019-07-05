from django.contrib import admin
from .models import Poll, PollAnswer, Comment, PollVote

# Register your models here.

admin.site.register(Poll)
admin.site.register(PollAnswer)
admin.site.register(Comment)
admin.site.register(PollVote)