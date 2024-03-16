from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response #to send a custom response from our view  


# Create your views here. this is where we write our end points "/hello" - a location on the webserver

#can create views by sending a post request to an end point 
class RoomView(generics.ListAPIView): #a view that returns all the diff rooms 
    queryset = Room.objects.all()
    serializer_class = RoomSerializer 

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    def post(self, request, format = None):
        #if the current user doesnt have an active session, create one
        if not self.request.session.exists(self.request.session.session_key): 
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)

            #if the session already exists, update new vals 
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])#updating the object with the new fields 
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else: #if not set vals
                room = Room(host = host, guest_can_pause = guest_can_pause, votes_to_skip = votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)#reutrn the room that was created
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
