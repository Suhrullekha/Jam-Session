#will store all the urls local to this app

from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom  #the function that we wrote in the views python file

#import all the function from views since these are the endpoints 
urlpatterns = [
    path('room', RoomView.as_view()),#for any url, dispatch to the main function
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view())
]