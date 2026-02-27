from django.db import models

# Create your models here.
from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=200)
    website = models.URLField()
    sector = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# models.py
from django.db import models

class SavedSearch(models.Model):
    query = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.query
    


class List(models.Model):
    title = models.CharField(max_length=255)
    companies = models.ManyToManyField(Company, related_name="lists")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Enrichment(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=[("Enriched", "Enriched"), ("Pending", "Pending")])
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company.name} - {self.status}"