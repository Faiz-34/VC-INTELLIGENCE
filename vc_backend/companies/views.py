from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Company
from .serializers import CompanySerializer, ListSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from bs4 import BeautifulSoup

@api_view(['GET'])
def enrich_company(request, pk):
    from .models import Company
    company = Company.objects.get(pk=pk)
    website = company.website

    try:
        page = requests.get(website, timeout=5)
        soup = BeautifulSoup(page.content, "html.parser")

        # Simple scraping example
        summary = soup.title.string if soup.title else "No summary found"
        keywords = [word for word in summary.split() if len(word) > 4]

        data = {
            "summary": summary,
            "what_they_do": ["Scraped info line 1", "Scraped info line 2"],
            "keywords": keywords[:6],
            "signals": ["Website active", "Basic scrape successful"],
            "sources": [website],
        }
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
# views.py
from rest_framework import viewsets
from .models import SavedSearch
from .serializers import SavedSearchSerializer

class SavedSearchViewSet(viewsets.ModelViewSet):
    queryset = SavedSearch.objects.all().order_by("-created_at")
    serializer_class = SavedSearchSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from companies.models import Company, List, Enrichment, SavedSearch

@api_view(['GET'])
def dashboard_stats(request):
    data = {
        "companies": Company.objects.count(),
        "lists": List.objects.count(),
        "enrichments": Enrichment.objects.count(),
        "saved_searches": SavedSearch.objects.count(),  # ✅ Added
    }
    return Response(data)

from rest_framework import viewsets
from .models import Enrichment
from .serializers import EnrichmentSerializer

class EnrichmentViewSet(viewsets.ModelViewSet):
    queryset = Enrichment.objects.all().order_by("-date")
    serializer_class = EnrichmentSerializer


@api_view(['GET'])
def activity(request):
    enrichments = Enrichment.objects.order_by('-date')[:10]
    data = [
        {"company": e.company.name, "status": e.status, "date": e.date}
        for e in enrichments
    ]
    return Response(data)



# companies/views.py
from rest_framework import viewsets
from .models import List
from .serializers import ListSerializer

class ListViewSet(viewsets.ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer
