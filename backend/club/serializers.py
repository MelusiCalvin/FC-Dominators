from rest_framework import serializers
from .models import Player, Coach, ClubInfo, Program, TestimonialOrEvent


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = [
            'id', 'name', 'position', 'jersey_number', 'bio', 'achievements',
            'date_of_birth', 'nationality', 'height', 'weight', 'photo',
            'is_featured', 'created_at', 'updated_at'
        ]


class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach
        fields = [
            'id', 'name', 'role', 'bio', 'experience_years',
            'certifications', 'photo', 'is_featured', 'created_at', 'updated_at'
        ]


class ClubInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubInfo
        fields = [
            'id', 'name', 'established_year', 'description', 'mission',
            'address', 'phone', 'email', 'website', 'active_members',
            'expert_coaches', 'programs', 'years_of_excellence',
            'logo', 'banner_image', 'created_at', 'updated_at'
        ]


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = [
            'id', 'name', 'description', 'age_group', 'schedule',
            'price', 'created_at', 'updated_at'
        ]


class TestimonialOrEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestimonialOrEvent
        fields = [
            'id', 'name', 'role', 'quote', 'image', 'created_at'
        ]
