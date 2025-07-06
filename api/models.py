from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Non-Binary", "Non-Binary"),
    ]
    BLOOD_GROUP_CHOICES = [
        ("A+", "A+"), ("A-", "A-"),
        ("B+", "B+"), ("B-", "B-"),
        ("AB+", "AB+"), ("AB-", "AB-"),
        ("O+", "O+"), ("O-", "O-"), ("Unknown", "Unknown")
    ]
    address=models.CharField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    picture = models.URLField(blank=True, null=True)
    pincode = models.CharField(max_length=10, blank=True, null=True)
    blood_group = models.CharField(max_length=7, choices=BLOOD_GROUP_CHOICES, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    gender = models.CharField(choices=GENDER_CHOICES, blank=True, null=True)

    def __str__(self):
        return self.first_name
    
class Hospital(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    pincode = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    rating = models.FloatField()
    image = models.ImageField(upload_to='hospitals/')

    def __str__(self):
        return self.name
    
from django.conf import settings

class Doctor(models.Model):
    name = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255)
    experience = models.IntegerField()
    qualification = models.TextField()
    about = models.TextField()
    image = models.ImageField(upload_to='doctors/')
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='doctors')
    available_days = models.JSONField()  # store list like ["Monday", "Tuesday"]
    available_start_time = models.TimeField()
    available_end_time = models.TimeField()
    slot_duration = models.PositiveIntegerField(help_text='Duration in minutes')
    fees = models.PositiveIntegerField()

    def __str__(self):
        return self.name

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.doctor.name} - {self.date}"

