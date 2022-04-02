from django.urls import path
from . import views

urlpatterns = [
    path('',views.login, name="login"),
    path('signup/',views.signup, name="signup"),
    path('chat/',views.chat, name="chat"),
    path('logout/', views.logout, name="logout"),
    path('addparticipant/', views.addparticipant, name="addparticipant"),
    path('addmessage/', views.addmessage, name="addmessage"),
    path('getmessage/', views.getmessage, name="getmessage"),
]
