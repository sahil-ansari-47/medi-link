from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

User=get_user_model()

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print("Post hit")
        token_from_frontend = request.data.get('token')
        if not token_from_frontend:
            response = Response({'error': 'Token not provided'}, status=400)
            response['Cross-Origin-Opener-Policy'] = 'restrict-properties'
            return response

        try:
            idinfo = id_token.verify_oauth2_token(
                token_from_frontend,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID
            )

            email = idinfo['email']
            name = idinfo.get('name', '')
            picture = idinfo.get('picture', '')

            first_name = name.split(' ')[0]
            last_name = ' '.join(name.split(' ')[1:]) if len(name.split()) > 1 else ''

            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'username': email,
                    'first_name': first_name,
                    'last_name': last_name,
                    'picture': picture,
                }
            )

            if not created and user.picture != picture:
                user.picture = picture
                user.save()

            tokens = get_tokens_for_user(user)
            serialized_user = UserSerializer(user)

            response = Response({
                'access': tokens['access'],
                'refresh': tokens['refresh'],
                'user': serialized_user.data
            })
            response['Cross-Origin-Opener-Policy'] = 'restrict-properties'
            return response

        except ValueError:
            response = Response({'error': 'Invalid token'}, status=400)
            response['Cross-Origin-Opener-Policy'] = 'restrict-properties'
            return response

from .models import Hospital, Doctor, Appointment
from .serializers import HospitalSerializer, DoctorSerializer, AppointmentSerializer
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend


class HospitalListView(generics.ListAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['city', 'state', 'pincode']
    ordering_fields = ['name', 'rating']
    search_fields = ['name', 'city', 'state']

class HospitalDetailView(generics.RetrieveAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    lookup_field = 'id'

from .filters import DoctorFilter

class DoctorListView(generics.ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_class = DoctorFilter
    ordering_fields = ['experience', 'fees', 'name']
    search_fields = ['name', 'specialization', 'qualification']

class DoctorDetailView(generics.RetrieveAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    lookup_field = 'id'

class AppointmentListView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['doctor', 'status', 'date']
    ordering_fields = ['date', 'time', 'status']
    search_fields = ['doctor__name', 'doctor__specialization']

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user)
    
class AppointmentDetailView(generics.RetrieveAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user)

class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(UserSerializer(request.user).data)