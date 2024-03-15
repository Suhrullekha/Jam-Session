#will store all the urls local to this app

from django.urls import path
from .views import RoomView #the function that we wrote in the views python file

urlpatterns = [
    path('room', RoomView.as_view()),#for any url, dispatch to the main function
]