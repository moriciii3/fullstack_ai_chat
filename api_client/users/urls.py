from rest_framework import routers
from .api import UserViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet, 'users')
urlpatterns = router.urls