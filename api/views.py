from django.shortcuts import render
from rest_framework import generics 
from .serializers import RoomSerializer
from .models import Room

# Create your views here. this is where we write our end points "/hello" - a location on the webserver


class RoomView(generics.ListAPIView): #a view that returns all the diff rooms 
    queryset = Room.objects.all()
    serializer_class = RoomSerializer 
