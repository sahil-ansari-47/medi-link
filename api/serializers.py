from rest_framework import serializers
from .models import Hospital, Doctor, Appointment
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = '__all__'

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # or use UserSerializer
    doctor = DoctorSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id', 'user', 'doctor', 'date',
            'time', 'status', 'created_at'
        ]
