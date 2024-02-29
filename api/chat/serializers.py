from rest_framework import serializers
from .models import User

class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
            'password'
        ]

        extra_kwargs = {
            'password':{
                'write_only':True
            }
        }

    def create(self, validated_data):
    # Extract data from validated_data
        username = validated_data.get('username', '').lower()
        first_name = validated_data.get('first_name', '').lower()
        last_name = validated_data.get('last_name', '').lower()
        password = validated_data.get('password', '')

        # Create a new User instance
        user = User.objects.create(
            username=username,
            first_name=first_name,
            last_name=last_name,
        )

        # Set password for the user
        user.set_password(password)
        user.save()

        return user



class UserSerializers(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    
    class Meta:
        model = User
        fields = [
            'username',
            'name',
            'thumbnail'
        ]

    def get_name(self,obj):
        fname = obj.first_name.capitalize()
        lname = obj.last_name.capitalize()
        return fname + ' ' + lname

class SearchSerializer(UserSerializers):
    status = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'username',
            'name',
            'thumbnail',
            'status'
        ]
    
    def get_status(self,obj):
        return 'no-connection'
    