from rest_framework import serializers
from .models import Player, Coach, ClubInfo, Program, ScheduleItem, TestimonialOrEvent


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
            'executive_director_name', 'executive_director_title',
            'goals_objectives', 'team_achievements', 'sponsorship_needs',
            'joining_cost', 'address', 'phone', 'whatsapp_number',
            'calls_number', 'email', 'website', 'active_members',
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


class ScheduleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleItem
        fields = [
            'id', 'item_type', 'opponent', 'competition', 'venue',
            'match_date', 'match_time', 'is_home', 'goals_for',
            'goals_against', 'notes', 'created_at', 'updated_at'
        ]


class TestimonialOrEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestimonialOrEvent
        fields = [
            'id', 'name', 'role', 'quote', 'image', 'created_at'
        ]
