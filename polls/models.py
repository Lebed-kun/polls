from django.db import models
from django.utils.text import slugify
import urllib.parse

from datetime import datetime

def TimestampMillisec64():
    return int((datetime.utcnow() - datetime(1970, 1, 1)).total_seconds() * 1000)

def gen_slug(s):
    millis = TimestampMillisec64()
    new_slug = urllib.parse.quote(s, safe='')
    new_slug = slugify(new_slug + '_' + str(millis))
    return new_slug

# Create your models here.
class Poll(models.Model):
    slug = models.SlugField(unique=True, blank=True, null=True)
    question = models.CharField(max_length=100)
    allow_multiple = models.BooleanField(default=False)
    allow_comments = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = gen_slug(self.question)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.question

class PollAnswer(models.Model):
    answer = models.CharField(max_length=100, blank=True, null=True)
    poll = models.ForeignKey('Poll', on_delete=models.CASCADE, related_name="PollAnswer")
    votes = models.IntegerField(default=0)
    
    def __str__(self):
        return self.answer

class Comment(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    text = models.TextField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)
    poll = models.ForeignKey('Poll', on_delete=models.CASCADE, related_name="Comment")
    
    def __str__(self):
        return self.text[:50]

class PollVote(models.Model):
    user_ip = models.GenericIPAddressField(blank=True, null=True)
    poll = models.ForeignKey('Poll', on_delete=models.CASCADE, related_name='PollVote')

    def __str__(self):
        return str(self.user_ip) + '_' + str(self.poll)