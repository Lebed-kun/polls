from django.shortcuts import render
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
)
from django.db.models import Q
from .models import Poll, PollAnswer, Comment, PollVote
from .serializers import PollSerializer, PollAnswerSerializer, CommentSerializer, PollVoteSerializer
from .paginators import PollPagination, CommentPagination

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0]
    else:
        return request.META.get('REMOTE_ADDR')

class PollListView(ListAPIView):
    serializer_class = PollSerializer
    pagination_class = PollPagination

    def get_queryset(self):
        search = self.request.query_params.get('search', None)
        if search is not None:
            search = search.split()
            word = search[0].lower()
            condition = Q(question__icontains=word)
            for kw in search[1:]:
                word = kw.lower()
                condition |= Q(question__icontains=word)
            return Poll.objects.filter(condition).order_by('-created_at')
        else:
            return Poll.objects.all().order_by('-created_at') 

class PollDetailView(RetrieveAPIView):
    lookup_field = 'slug'
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

class PollCreateView(CreateAPIView):
    serializer_class = PollSerializer

class PollAnswerListView(ListAPIView):
    serializer_class = PollAnswerSerializer

    def get_queryset(self):
        slug = self.kwargs['slug']
        poll = Poll.objects.get(slug=slug)
        return PollAnswer.objects.filter(poll=poll) 

class PollAnswerCreateView(CreateAPIView):
    serializer_class = PollAnswerSerializer

    def perform_create(self, serializer):
        poll = Poll.objects.get(slug=self.kwargs['slug'])
        serializer.save(poll=poll)
        
class CommentListView(ListAPIView):
    serializer_class = CommentSerializer
    pagination_class = CommentPagination

    def get_queryset(self):
        slug = self.kwargs['slug']
        poll = Poll.objects.get(slug=slug)
        return Comment.objects.filter(poll=poll).order_by('-created_at')

class CommentCreateView(CreateAPIView):
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        poll = Poll.objects.get(slug=self.kwargs['slug'])
        serializer.save(poll=poll)

class PollVoteView(ListAPIView):
    serializer_class = PollVoteSerializer

    def get_queryset(self):
        user_ip = get_client_ip(self.request)
        poll = Poll.objects.get(slug=self.kwargs['slug'])
        return PollVote.objects.filter(Q(user_ip=user_ip) & Q(poll=poll))

class PollVoteCreateView(CreateAPIView):
    serializer_class = PollVoteSerializer

    def perform_create(self, serializer):
        user_ip = get_client_ip(self.request)
        poll = Poll.objects.get(slug=self.kwargs['slug'])
        serializer.save(user_ip=user_ip, poll=poll)

class AddVoteView(UpdateAPIView):
    serializer_class = PollAnswerSerializer

    def get_queryset(self):
        return PollAnswer.objects.get(id=self.kwargs['pk'])

    def perform_update(self, serializer):
        answer = PollAnswer.objects.get(id=self.kwargs['pk'])
        votes = answer.votes + 1
        serializer.save(votes=votes)