from django.contrib import admin
from .models import *
# Register your models here.

"""for one field in list_display:
1. list_display = ('field', )
2. list_display = ['field']"""

class ProfileNickAdmin(admin.ModelAdmin):
	list_display = ('user', 'nick', 'color')

class RoomAdmin(admin.ModelAdmin):
	list_display = ['roomid']

class MapUserWithRoomAdmin(admin.ModelAdmin):
	list_display = ('user', 'room')

	"""def get_user(self, obj):
		return self.obj.username

	def get_room(self, obj):
		return self.obj.roomid"""

class ChatAdmin(admin.ModelAdmin):
	list_display = ('user', 'room', 'message', 'date', 'time')

admin.site.register(ProfileNick, ProfileNickAdmin)
admin.site.register(Room, RoomAdmin)
admin.site.register(MapUserWithRoom, MapUserWithRoomAdmin)
admin.site.register(Chat, ChatAdmin)
