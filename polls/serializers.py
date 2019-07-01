from rest_framework import serializers
from polls.models import Poll, PollAnswer, Comment

class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = ('slug', 'question', 'allow_multiple', 'allow_comments', 'created_at')

class PollAnswerSerializer(serializers.ModelSerializer):
    poll_slug = serializers.CharField(source='poll.slug', read_only=True)
    
    class Meta:
        model = PollAnswer
        fields = ('id', 'answer', 'poll_slug')

class CommentSerializer(serializers.ModelSerializer):
    poll_slug = serializers.CharField(source='poll.slug', read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'name', 'email', 'text', 'created_at', 'poll_slug')