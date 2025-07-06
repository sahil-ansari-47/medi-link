from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Doctor, Hospital, Appointment
from django.contrib.auth import get_user_model

User=get_user_model()

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    model = User
    list_display = (
        "id", "username", "email", "first_name", "last_name", 
        "phone_number", "city", "state", "pincode", "blood_group", 
        "age", "gender", "is_staff"
    )
    search_fields = ("email", "username", "first_name", "last_name", "city", "state", "pincode")
    list_filter = ("is_staff", "is_superuser", "state", "city", "gender", "blood_group")
    fieldsets = BaseUserAdmin.fieldsets + (
        ("Additional Info", {
            "fields": (
                "phone_number", "state", "city", "pincode",
                "blood_group", "age", "gender", "picture", "address"
            )
        }),
    )


@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "city", "state", "pincode", "rating")
    search_fields = ("name", "city", "state", "pincode")
    list_filter = ("state", "city", "rating")


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "specialization", "experience", "fees", "hospital")
    search_fields = ("name", "specialization", "qualification")
    list_filter = ("specialization", "hospital", "experience", "fees")
    autocomplete_fields = ("hospital",)


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "doctor", "date", "time", "status", "created_at")
    list_filter = ("status", "date", "doctor", "user")
    search_fields = ("user__email", "doctor__name", "doctor__specialization")
    autocomplete_fields = ("user", "doctor")
