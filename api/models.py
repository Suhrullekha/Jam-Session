from django.db import models
import string
import random



def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code


# Create your models here.
#pretty much a table 
class Room(models.Model):
    #what are the things/attribuetes that each room that is hosted have? 
    code = models.CharField(max_length = 8, default=generate_unique_code, unique=True) #will store characters and call that function by default
    host = models.CharField(max_length=50, unique=True) #unique = one host per room
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    
