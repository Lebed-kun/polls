from django.shortcuts import render
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
)
from django.db.models import Q
from polls.models import Poll, PollAnswer, Comment
from .serializers import PollSerializer, PollAnswerSerializer, CommentSerializer
from .paginators import PollPagination, CommentPagination

class PollListView(ListAPIView):
    serializer_class = PollSerializer
    pagination_class = PollPagination

    def get_queryset(self):
        search = self.request.query_params.get('search', None)
        if search is not None:
            query = query.split()
            word = query[0].lower()
            condition = Q(question__icontains=word)
            for kw in query[1:]:
                word = kw.lower()
                condition |= Q(question__icontains=word)
            return Poll.objects.filter(condition).order_by('-created_at')
        else:
            return Poll.objects.all().order_by('-created_at') 

class PollDetailView(RetrieveAPIView):
    serializer_class = PollSerializer

    def get_queryset(self):
        slug = self.kwargs['pk']
        return Poll.objects.get(slug=slug)

class PollCreateView(CreateAPIView):
    serializer_class = PollSerializer

class PollAnswerListView(ListAPIView):
    serializer_class = PollAnswerSerializer

    def get_queryset(self):
        slug = self.kwargs['pk']
        poll = Poll.objects.get(slug=slug)
        return PollAnswer.objects.filter(poll=poll)

class PollAnswerCreateView(CreateAPIView):
    serializer_class = PollAnswer

    def perform_create(self, serializer):
        poll = Poll.objects.get(slug=self.kwargs['pk'])
        serializer.save(poll=poll)

class CommentListView(ListAPIView):
    serializer_class = CommentSerializer
    pagination_class = CommentPagination

    def get_queryset(self):
        slug = self.kwargs['pk']
        poll = Poll.objects.get(slug=slug)
        print(poll)
        return Comment.objects.filter(poll=poll).order_by('-created_at')

class CommentCreateView(CreateAPIView):
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        poll = Poll.objects.get(slug=self.kwargs['pk'])
        serializer.save(poll=poll)