from django.shortcuts import render

# Create your views here.
#we need to render the template "index" this so react can take it 
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')
