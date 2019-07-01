from rest_framework.pagination import (
    LimitOffsetPagination
)

class PollPagination(LimitOffsetPagination):
    max_limit = 10
    default_limit = 8

class CommentPagination(LimitOffsetPagination):
    max_limit = 10
    default_limit = 4