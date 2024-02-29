import json
import base64
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.core.files.base import ContentFile
from .models import User
from .serializers import UserSerializers,SearchSerializer
from django.db.models import Q

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        user = self.scope['user']
        print(user,user.is_authenticated)
        if not user.is_authenticated:
            return
        #Save username to use as group name    
        self.username = user.username

        #Join this User to Group of Username
        async_to_sync(self.channel_layer.group_add)(
            self.username,self.channel_name
        )

        self.accept()
    
    def disconnect(self, code):
       # Leave group
       async_to_sync(self.channel_layer.group_discard)(
            self.username,self.channel_name
        )
    
    #handle  Request
       
    def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        data_source = data.get('source')

        print('receive',json.dumps(data,indent=1))

        #Seach / filter Users
        if data_source == 'search':
            self.receive_search(data)

        #Thumbnail
        elif data_source == 'thumbnail':
            self.receive_thumbnail(data)

    def receive_search(self,data):
        query = data.get('query')
        # get user from query search term
        users = User.objects.filter(
            Q(username__istartswith=query) |
            Q(first_name__istartswith=query) |
            Q(last_name__istartswith=query) 
        ).exclude(
            username=self.username
        )
        # .annotate(
        #     pending_them=Exists(
        #         Connection
        #     )
        #     pending_me=...
        #     connected=...
        # )

        #serialize results

        serialized = SearchSerializer(users,many=True)
        # Send updated user data including new thumbnail
        self.send_group(self.username,'search',serialized.data)

    def receive_thumbnail(self,data):
        user = self.scope['user']

        # Convert base64 data to django content file
        img_str = data.get('base64')
        image = ContentFile(base64.b64decode(img_str))

        #Update thubnailField
        filename = data.get('filename')
        user.thumbnail.save(filename,image,save=True)

        #Serialize user
        serialized = UserSerializers(user)

        #Send updated user data including new thumbnail
        self.send_group(self.username,'thumbnail',serialized.data)

    def send_group(self,group,source,data):
        response = {
            'type':'broadcast_group',
            'source':source,
            'data':data
        }

        async_to_sync(self.channel_layer.group_send)(
            group,response
        )
    
    def broadcast_group(self,data):
        '''
            data:
             - type:
             - source:
             - data: 
        '''

        data.pop('type')

        '''
            data:
             - source:
             - data: 
        '''

        self.send(text_data=json.dumps(data))


     
