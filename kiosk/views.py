from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'home/index.html')

def kiosk(request):
    return render(request, 'kiosk/caffe_main.html')

def guide(request):
    return render(request, 'kiosk/kiosk_guide.html')

def simulator(request):
    return render(request, 'kiosk/simulator.html')

def quiz(request):
    return render(request, 'kiosk/order_mission.html')