from django.contrib import admin
from .models import Company,SavedSearch,List,Enrichment
# Register your models here.

admin.site.register(Company)
admin.site.register(SavedSearch)
admin.site.register(List)
admin.site.register(Enrichment)