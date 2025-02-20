from django.urls import path
from .views import predict_animal_view

urlpatterns = [
    path('predict', predict_animal_view, name='predict_animal'),
]