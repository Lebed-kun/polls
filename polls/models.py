from django.db import models
from django.utils.text import slugify
import urllib.parse

def gen_slug(s):
    new_slug = urllib.parse.quote(s, safe='')
    new_slug = slugify(new_slug)
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
    answer = models.CharField(max_length=100)
    poll = models.ForeignKey('Poll', on_delete=models.CASCADE, related_name="PollAnswer")
    
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