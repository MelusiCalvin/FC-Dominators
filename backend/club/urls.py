from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PlayerViewSet, CoachViewSet, ClubInfoViewSet,
    ProgramViewSet, ScheduleItemViewSet, TestimonialOrEventViewSet
)

router = DefaultRouter()
router.register(r'players', PlayerViewSet)
router.register(r'coaches', CoachViewSet)
router.register(r'club-info', ClubInfoViewSet, basename='clubinfo')
router.register(r'programs', ProgramViewSet)
router.register(r'schedule-items', ScheduleItemViewSet)
router.register(r'testimonials', TestimonialOrEventViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
