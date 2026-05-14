from django.contrib import admin
from .models import Player, Coach, ClubInfo, Program, TestimonialOrEvent


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'jersey_number', 'is_featured')
    list_filter = ('position', 'is_featured', 'created_at')
    search_fields = ('name', 'position')
    ordering = ['jersey_number']


@admin.register(Coach)
class CoachAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'experience_years', 'is_featured')
    list_filter = ('role', 'is_featured', 'created_at')
    search_fields = ('name', 'role')


@admin.register(ClubInfo)
class ClubInfoAdmin(admin.ModelAdmin):
    list_display = ('name', 'established_year', 'email')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('name', 'age_group', 'price')
    list_filter = ('created_at',)
    search_fields = ('name', 'age_group')


@admin.register(TestimonialOrEvent)
class TestimonialOrEventAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'role')
