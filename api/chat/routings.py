from django.urls import path
from . import cosumers

websocker_urlpatterns = [
    path('chat/',cosumers.ChatConsumer.as_asgi())
]