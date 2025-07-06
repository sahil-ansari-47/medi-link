from django_filters import rest_framework as filters
from .models import Doctor
from django_filters.filters import CharFilter

class DoctorFilter(filters.FilterSet):
    available_days = CharFilter(method='filter_available_days')

    class Meta:
        model = Doctor
        fields = ['hospital', 'specialization', 'available_days']

    def filter_available_days(self, queryset, name, value):
        return queryset.filter(available_days__icontains=value)
