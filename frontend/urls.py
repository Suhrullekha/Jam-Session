
from django.urls import path
from .views import index

urlpatterns = [
    path('', index), #will render the index template whenever we have an empty url - home page
    path('join', index),
    path('create', index)
]
