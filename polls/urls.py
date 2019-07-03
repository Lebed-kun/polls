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
    path('poll/<slug>/', PollDetailView.as_view()),
    path('new_poll/', PollCreateView.as_view()),
    path('answers/<slug>/', PollAnswerListView.as_view()),
    path('new_answer/<slug>/', PollAnswerCreateView.as_view()),
    path('comments/<slug>/', CommentListView.as_view()),
    path('new_comment/<slug>/', CommentCreateView.as_view()),
]