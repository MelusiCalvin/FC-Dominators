from django.db import models
from django.core.validators import URLValidator

class ClubInfo(models.Model):
    """Store club information"""
    name = models.CharField(max_length=200, default="FC Dominators")
    established_year = models.IntegerField(default=2010)
    description = models.TextField()
    mission = models.TextField()
    address = models.CharField(max_length=300)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    website = models.URLField(blank=True)
    active_members = models.IntegerField(default=500)
    expert_coaches = models.IntegerField(default=15)
    programs = models.IntegerField(default=25)
    years_of_excellence = models.IntegerField(default=12)
    logo = models.ImageField(upload_to='club/', blank=True, null=True)
    banner_image = models.ImageField(upload_to='club/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Club Info"

    def __str__(self):
        return self.name


class Player(models.Model):
    """Store player information"""
    POSITION_CHOICES = [
        ('goalkeeper', 'Goalkeeper'),
        ('defender', 'Defender'),
        ('midfielder', 'Midfielder'),
        ('forward', 'Forward'),
    ]

    name = models.CharField(max_length=200)
    position = models.CharField(max_length=50, choices=POSITION_CHOICES)
    jersey_number = models.IntegerField()
    bio = models.TextField()
    achievements = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    nationality = models.CharField(max_length=100, blank=True)
    height = models.CharField(max_length=50, blank=True)
    weight = models.CharField(max_length=50, blank=True)
    photo = models.ImageField(upload_to='players/')
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['jersey_number']

    def __str__(self):
        return f"{self.name} ({self.position})"


class Coach(models.Model):
    """Store coach information"""
    ROLE_CHOICES = [
        ('head_coach', 'Head Coach'),
        ('assistant_coach', 'Assistant Coach'),
        ('fitness_coach', 'Fitness & Conditioning Lead'),
        ('youth_coach', 'Youth Academy Coach'),
    ]

    name = models.CharField(max_length=200)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    bio = models.TextField()
    experience_years = models.IntegerField()
    certifications = models.TextField(blank=True)
    photo = models.ImageField(upload_to='coaches/')
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.role})"


class Program(models.Model):
    """Store program information"""
    name = models.CharField(max_length=200)
    description = models.TextField()
    age_group = models.CharField(max_length=100)
    schedule = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class TestimonialOrEvent(models.Model):
    """Store testimonials or event information"""
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    quote = models.TextField()
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name
