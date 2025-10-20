from django.urls import path, include
from rest_framework import routers
from .api import UserViewSet
from . import views

router = routers.DefaultRouter()
router.register('users', UserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.login_view, name='login'),
]
