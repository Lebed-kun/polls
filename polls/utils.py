from datetime import datetime
from django.utils.text import slugify
import urllib.parse

def TimestampMillisec64():
    return int((datetime.utcnow() - datetime(1970, 1, 1)).total_seconds() * 1000)

def gen_slug(s):
    millis = TimestampMillisec64()
    new_slug = urllib.parse.quote(s, safe='')
    new_slug = slugify(new_slug + '_' + str(millis))
    return new_slug