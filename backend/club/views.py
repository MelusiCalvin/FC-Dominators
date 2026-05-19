from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from .models import Player, Coach, ClubInfo, Program, ScheduleItem, TestimonialOrEvent
from .serializers import (
    PlayerSerializer, CoachSerializer, ClubInfoSerializer,
    ProgramSerializer, ScheduleItemSerializer, TestimonialOrEventSerializer
)


class PlayerViewSet(viewsets.ModelViewSet):
    """ViewSet for Player management"""
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get only featured players"""
        featured_players = Player.objects.filter(is_featured=True)
        serializer = self.get_serializer(featured_players, many=True)
        return Response(serializer.data)


class CoachViewSet(viewsets.ModelViewSet):
    """ViewSet for Coach management"""
    queryset = Coach.objects.all()
    serializer_class = CoachSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get only featured coaches"""
        featured_coaches = Coach.objects.filter(is_featured=True)
        serializer = self.get_serializer(featured_coaches, many=True)
        return Response(serializer.data)


class ClubInfoViewSet(viewsets.ModelViewSet):
    """ViewSet for Club Information"""
    queryset = ClubInfo.objects.all()
    serializer_class = ClubInfoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        if not ClubInfo.objects.exists():
            ClubInfo.objects.create()
        return ClubInfo.objects.all()

    def get_object(self):
        """Always return the first (and typically only) club info object."""
        obj = ClubInfo.objects.order_by('id').first()
        if obj:
            return obj
        return ClubInfo.objects.create()


class ProgramViewSet(viewsets.ModelViewSet):
    """ViewSet for Program management"""
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]


class ScheduleItemViewSet(viewsets.ModelViewSet):
    """ViewSet for fixtures and results."""
    queryset = ScheduleItem.objects.all()
    serializer_class = ScheduleItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'])
    def fixtures(self, request):
        queryset = ScheduleItem.objects.filter(item_type='fixture').order_by('match_date', 'match_time', 'id')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def results(self, request):
        queryset = ScheduleItem.objects.filter(item_type='result').order_by('-match_date', '-match_time', '-id')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class TestimonialOrEventViewSet(viewsets.ModelViewSet):
    """ViewSet for Testimonial and Event management"""
    queryset = TestimonialOrEvent.objects.all()
    serializer_class = TestimonialOrEventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]
