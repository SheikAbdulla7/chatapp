from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
# Create your models here.


"""me = models.ForeignKey(User, on_delete=models.CASCADE)
user2 = models.CharField(null=True, max_length=120)
room = models.CharField(null=True, max_length=100)
message = models.TextField(null=True, blank=False, max_length=800)
time = models.DateTimeField(null=True, auto_now_add=False)"""

class ProfileNick(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	nick = models.CharField(null=True, max_length=10)
	color = models.CharField(choices = (('#044187', '#044187'), ('#000000', '#000000'), ('#026333', '#026333'), ('#512DA8', '#512DA8')), default='blue', max_length=20)

	def __str__(self):
		return self.nick

	def __str__(self):
		return self.color

class Room(models.Model):
	roomid = models.IntegerField(null=True)

	def __str__(self):
		return str(self.roomid)

class MapUserWithRoom(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	room = models.ForeignKey(Room, on_delete=models.CASCADE)

	"""def __str__(self):
		return self.user.id

	def __str__(self):
		return self.room.id"""

class Chat(models.Model):
	user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
	room = models.ForeignKey(Room, null=True, on_delete=models.CASCADE)
	message = models.TextField(null=True, blank=True, max_length=1000)
	image = models.FileField(upload_to="images")
	date = models.DateField(null=True, auto_now_add=False)
	time = models.TimeField(null=True, auto_now_add=False)

	def __str__(self):
		return self.message

	def __str__(self):
		return str(self.date)

	def __str__(self):
		return str(self.time)

"""class ImageChat(models.Model):
	user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
	room = models.ForeignKey(Room, null=True, on_delete=models.CASCADE)
	image = models.FileField(upload_to="images")
	date = models.DateField(null=True, auto_now_add=False)
	time = models.TimeField(null=True, auto_now_add=False)

	def __str__(self):
		return self.message

	def __str__(self):
		return str(self.date)

	def __str__(self):
		return str(self.time)
"""
