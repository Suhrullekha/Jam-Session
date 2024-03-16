
from django.urls import path
from .views import index

#general urls 
urlpatterns = [
    path('', index), #will render the index template whenever we have an empty url - home page
    path('join', index),
    path('create', index),
    path('room/<str:roomCode>', index) #accepts any string after room and stores it in roomCode
]
