from django.urls import path
from .views import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('auth/google/', csrf_exempt(GoogleLoginView.as_view()), name='google-login'),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path('hospitals/', HospitalListView.as_view(), name='hospital-list'),
    path('hospitals/<int:id>/', HospitalDetailView.as_view(), name='hospital-detail'),
    path('doctors/', DoctorListView.as_view(), name='doctor-list'),
    path('doctors/<int:id>/', DoctorDetailView.as_view(), name='doctor-detail'),
    path('appointments/', AppointmentListView.as_view(), name='appointment-list'),
    path('appointments/<int:id>/', AppointmentDetailView.as_view(), name='appointment-detail'),
    path("api/user/", CurrentUserView.as_view(), name="current-user"),
]
