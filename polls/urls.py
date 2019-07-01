from django.urls import path

from .views import (
    PollListView,
    PollDetailView,
    PollCreateView,
    PollAnswerListView,
    PollAnswerCreateView,
    CommentListView,
    CommentCreateView
)

urlpatterns = [
    path('', PollListView.as_view()),
    path('poll/<pk>/', PollDetailView.as_view()),
    path('new_poll/', PollCreateView.as_view()),
    path('answers/<pk>/', PollAnswerListView.as_view()),
    path('new_answer/<pk>/', PollAnswerCreateView.as_view()),
    path('comments/<pk>/', CommentListView.as_view()),
    path('new_comment/<pk>/', CommentCreateView.as_view()),
]