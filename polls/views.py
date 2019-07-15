from django.shortcuts import render
from django.db.models import F
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    GenericAPIView,
)

from rest_framework.mixins import (
    UpdateModelMixin,
)
from django.db.models import Q
from .models import Poll, PollAnswer, Comment, PollVote
from .serializers import PollSerializer, PollAnswerSerializer, CommentSerializer, PollVoteSerializer
from .paginators import PollPagination, CommentPagination

MAX_ANSWERS_ON_POLL = 10

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0]
    else:
        return request.META.get('REMOTE_ADDR')

def vote_exists(request, poll):
    user_ip = get_client_ip(request)
    vote = PollVote.objects.filter(Q(user_ip=user_ip) & Q(poll=poll))
    return vote.count() > 0

def create_vote(request, poll):
    user_ip = get_client_ip(request)
    PollVote.objects.create(user_ip=user_ip, poll=poll)

def count_answers(poll):
    answers = PollAnswer.objects.filter(poll=poll)
    return answers.count()

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

""" class PollCreateView(CreateAPIView):
    serializer_class = PollSerializer """

class PollCreateView(CreateAPIView):
    serializer_class = PollSerializer

    def perform_create(self, serializer):
        question = self.request.data.get('question')
        answers = self.request.data.get('answers')
        allow_multiple = self.request.data.get('allow_multiple')
        allow_comments = self.request.data.get('allow_comments')

        if bool(answers) and len(answers) > 0:
            poll = Poll.objects.create(
                question=question, 
                allow_multiple=allow_multiple, 
                allow_comments=allow_comments
            )

            for answer in answers:
                PollAnswer.objects.create(answer=answer, poll=poll)
        else:
            print('Poll should contain answers!')

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

        if count_answers(poll) < MAX_ANSWERS_ON_POLL:
            serializer.save(poll=poll)
        else:
            print('You cannot create more than ' +\
                str(MAX_ANSWERS_ON_POLL) + ' answers on poll')
        
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

        if poll.allow_comments:
            serializer.save(poll=poll)
        else:
            print('Comments aren\'t allowed on the poll "' +\
                poll.question + '"!')

class PollVoteView(ListAPIView):
    serializer_class = PollVoteSerializer

    def get_queryset(self):
        user_ip = get_client_ip(self.request)
        poll = Poll.objects.get(slug=self.kwargs['slug'])
        return PollVote.objects.filter(Q(user_ip=user_ip) & Q(poll=poll))

class VoteAddView(UpdateAPIView):
    serializer_class = PollAnswerSerializer
    queryset = PollAnswer.objects.all()

    def perform_update(self, serializer):
        answerIds = self.request.query_params.get('choices', None)
        
        if answerIds is not None:
            answerIds = answerIds.split(',')
            for i in range(len(answerIds)):
                answerIds[i] = int(answerIds[i])

            answer = PollAnswer.objects.get(id=answerIds[0])

            if not vote_exists(self.request, answer.poll):
                if not answer.poll.allow_multiple:
                    answerIds = answerIds[:1]
                
                PollAnswer.objects.filter(id__in=answerIds).update(votes=F('votes')+1)
                create_vote(self.request, answer.poll)
            else:
                print('Poll "' + poll.question + '" already voted!')






        