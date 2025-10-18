from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'created_at')
        read_only_fields = ('created_at',) # Solo se puede leer
