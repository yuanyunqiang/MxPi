from django.urls import path
from app.consumers import ChatConsumer
 
websocket_urlpatterns = [
    path('./ws/run/',ChatConsumer.as_asgi())
]