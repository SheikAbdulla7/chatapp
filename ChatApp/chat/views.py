from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_protect
from .models import *
from datetime import datetime, date
import pytz
import random


# Create your views here.
me=''
def signup(request):
	#return HttpResponse('<h1>signup</h1>')
	if request.method == 'POST':
		username = request.POST['username']
		email = request.POST['email']
		password = request.POST['password']
		user = User.objects.create_user(username=username, email=email, password=password)
		user.save()
		print(type(user))
		#print(user__username)
		print(type(user.username))
		random_num = random.randint(1, 1000)
		color = ['#044187', '#000000', '#026333', '#512DA8']
		#['#0603a1']
		profile = ProfileNick.objects.create(user=user, nick=user.username[0].upper(), color=color[random_num % 4])
		profile.save()
		print(user)
		return redirect('login')
	else:
		return render(request, "signup.html")

def login(request):
	#return HttpResponse('<h1>login</h1>')
	if request.method == "POST":
		username = request.POST['username']
		password = request.POST['password']
		user = auth.authenticate(username=username, password=password)
		print(user)
		if user is not None:
			auth.login(request, user)
			print("login successful")
			return redirect('chat')
		else:
			print("login failed")
			return redirect('signup')
	else:
		return render(request, "index.html")

def logout(request):
	auth.logout(request)
	return redirect('login')


def chat(request):
	global me
	if request.user.is_authenticated:
		me=request.user.username
		a = MapUserWithRoom.objects.filter(user__username=me).values('room__roomid')
		connected_room = MapUserWithRoom.objects.filter(room__roomid__in=a).exclude(user__username= me).values('user__id', 'user__username', 'room__roomid')
		print(a)
		all_logged_user = User.objects.exclude(id__in=MapUserWithRoom.objects.filter(room__roomid__in=a).exclude(user__username= me).values('user__id')).exclude(username= me).values('id','username')
		profiles = ProfileNick.objects.all().values('user__id', 'user__username', 'nick', 'color')
		myprofile = ProfileNick.objects.filter(user=request.user.id).values('user__id', 'nick', 'color')
		print(myprofile)
		#print(all_user)
		return render(request,"chat.html", {'myname': request.user.username, 'myid': request.user.id, 'myprofile':myprofile, 'all_user': all_logged_user, 'connected_room':connected_room, 'profiles':profiles})
		

	else:
		return render(request, 'error_page.html')

#@csrf_protect
def addparticipant(request):
	#if request.method == 'POST':
	participant_id = request.POST.get('participant')
	"""print(type(participant_id))
				print(User.objects.get(id = participant_id))"""
	participant_obj = User.objects.get(id = participant_id)
	#print(participant_obj.username)
	me = request.user.username
	def generate_roomid(digits):
	    lower = 10**(digits-1)
	    upper = 10**digits - 1
	    return random.randint(lower, upper)
	generateroomid = int(str(len(me)) + str(generate_roomid(6)) + str(len(participant_obj.username)))
	print(generateroomid)
	create_room = Room.objects.create(roomid=generateroomid)
	create_room.save()

	room_obj = Room.objects.get(roomid=generateroomid)
	map_user_room1 = MapUserWithRoom.objects.create(user=request.user, room=room_obj)
	map_user_room1.save()

	map_user_room2 = MapUserWithRoom.objects.create(user=participant_obj, room=room_obj)
	map_user_room2.save()

	a = MapUserWithRoom.objects.filter(user__username=me).values('room__roomid')
	connected_room = MapUserWithRoom.objects.filter(room__roomid__in=a).exclude(user__username= me).values('user__id', 'user__username', 'room__roomid')
	#print(connected_room)
	all_logged_user = User.objects.exclude(id__in=MapUserWithRoom.objects.filter(room__roomid__in=a).exclude(user__username= me).values('user__id')).exclude(username= me).values('id','username')
	profiles =  list(ProfileNick.objects.all().values('user__id', 'nick', 'color'))
	#print(all_logged_user)
			
	return JsonResponse({'success':'successful', 'connected_room': list(connected_room), 'all_logged_user':list(all_logged_user), 'profiles': profiles}, safe=False)

def addmessage(request):
	senderid = request.POST.get("sender")
	roomid = request.POST.get("room")
	message = request.POST.get("message")
	image = request.POST.get("image")
	print("the image is " )
	#print(image)
	sender = User.objects.get(id=senderid)
	print(sender.id)
	room = Room.objects.get(roomid=roomid)
	#print("sender is " + sender)
	print(sender, room, message)
	today = date.today().strftime("%Y-%m-%d")  # dd/mm/YY
	print(today)
	tz_NY = pytz.timezone('Asia/Kolkata') 
	datetime_NY = datetime.now(tz_NY)
	time = datetime_NY.strftime("%H:%M:%S")
	print(time)
	if image is not None:
		load = Chat.objects.create(user=sender, room=room, image=image, date=today, time=time)
		load.save()
	else:
		load = Chat.objects.create(user=sender, room=room, message=message, date=today, time=time)
		load.save()
	return JsonResponse({"success" : "successful"}, safe=False)

def getmessage(request):
	roomid = request.GET.get('roomid')
	recipientid = request.GET.get('recipientid')
	room = Room.objects.get(roomid=roomid)
	messages = list(Chat.objects.filter(room=room).values('user__id', 'room__id', 'message', 'image', 'date', 'time'))
	profile = list(ProfileNick.objects.filter(user__id=recipientid).values('user__id', 'nick', 'color'))
	print(messages)
	return JsonResponse({'messages':messages, 'profile': profile}, safe=False)
