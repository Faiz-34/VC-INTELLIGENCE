from typing import List

from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

# serializers.py
from rest_framework import serializers
from .models import SavedSearch

class SavedSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedSearch
        fields = "__all__"


from rest_framework import serializers
from .models import Enrichment

class EnrichmentSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source="company.name", read_only=True)

    class Meta:
        model = Enrichment
        fields = ["id", "company", "company_name", "status", "date"]


from rest_framework import serializers
from .models import List


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['id', 'title', 'companies', 'created_at']
        extra_kwargs = {
            'companies': {'required': False}   # <-- companies optional
        }  # <-- companies optional
        