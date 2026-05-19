# FC Dominators Website

A modern portfolio website for FC Dominators sports club built with Django, Next.js, and Tailwind CSS.

## Features

- **Public Site**: Modern, responsive portfolio website matching the FC Dominators template
- **Admin Dashboard**: Manage players, coaches, club information, and testimonials
- **Django REST API**: Powerful backend API for all content management
- **Dark Theme**: Professional dark UI with orange accents matching the brand
- **Image Support**: Upload and manage player and coach photos
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices

## Project Structure

```
FC Dominators/
├── backend/          # Django REST API
│   ├── config/       # Django settings & URLs
│   ├── club/         # Main app with models, views, serializers
│   ├── media/        # Uploaded images
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/         # Next.js + Tailwind CSS
    ├── src/
    │   ├── app/      # Pages & layouts
    │   ├── components/   # Reusable components
    │   ├── lib/      # API client & utilities
    ├── package.json
    └── next.config.js
```

## Setup Instructions

### Backend Setup (Django)

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser** (for admin access)
   ```bash
   python manage.py createsuperuser
   ```

6. **Run development server**
   ```bash
   python manage.py runserver
   ```
   Django will run at `http://localhost:8000`

### Frontend Setup (Next.js)

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env.local file**
   ```bash
   cp .env.example .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Next.js will run at `http://localhost:3000`

## Usage

### Public Website
Visit `http://localhost:3000` to view the portfolio website.

Sections include:
- **Hero**: Eye-catching landing section
- **Meet the Team**: Featured coaches with photos and bios
- **About Us**: Club information and statistics
- **Our Squad**: Player roster with positions and numbers
- **Testimonials**: Member feedback and success stories
- **Call to Action**: Join and contact options

### Admin Dashboard
1. Access Django admin at `http://localhost:8000/admin/`
2. Login with your superuser credentials
3. From the main website, navigate to `/admin/` for the modern admin panel

**Admin Features**:
- ✅ **Players Management**: Add/edit/delete players with photos, positions, and stats
- ✅ **Coaches Management**: Manage coaching staff with roles and experience
- ✅ **Club Info**: Edit club description, mission, statistics, and contact details
- ✅ **Testimonials**: Add/manage member testimonials and success stories

## API Endpoints

All endpoints require authentication for write operations (POST, PUT, DELETE).

### Players
- `GET /api/players/` - List all players
- `GET /api/players/{id}/` - Get player details
- `GET /api/players/featured/` - Get featured players
- `POST /api/players/` - Create new player
- `PUT /api/players/{id}/` - Update player
- `DELETE /api/players/{id}/` - Delete player

### Coaches
- `GET /api/coaches/` - List all coaches
- `GET /api/coaches/{id}/` - Get coach details
- `GET /api/coaches/featured/` - Get featured coaches
- `POST /api/coaches/` - Create new coach
- `PUT /api/coaches/{id}/` - Update coach
- `DELETE /api/coaches/{id}/` - Delete coach

### Club Info
- `GET /api/club-info/` - Get club information
- `PUT /api/club-info/{id}/` - Update club info

### Testimonials
- `GET /api/testimonials/` - List all testimonials
- `POST /api/testimonials/` - Create testimonial
- `PUT /api/testimonials/{id}/` - Update testimonial
- `DELETE /api/testimonials/{id}/` - Delete testimonial

## Styling

The site uses:
- **Tailwind CSS** for utilities and responsive design
- **Custom CSS** for gradients and animations
- **Color Scheme**: Dark background (#0f0f0f, #1a1a1a) with orange accents (#FF5722)

## Technologies Used

**Backend**:
- Django 4.2
- Django REST Framework
- CORS Headers
- Pillow (Image handling)

**Frontend**:
- Next.js 14
- React 18
- JavaScript
- Tailwind CSS
- Axios

## Database

SQLite is used by default for development. Data includes:
- Players (name, position, jersey number, bio, photo, etc.)
- Coaches (name, role, experience, certifications, photo, etc.)
- Club Info (name, mission, description, statistics, contact)
- Testimonials (member quotes and feedback)

## Production Deployment

For production:
1. Set `DEBUG = False` in Django settings
2. Configure `ALLOWED_HOSTS` for your domain
3. Use a production database (PostgreSQL recommended)
4. Set strong `SECRET_KEY`
5. Use environment variables for sensitive data
6. Deploy backend to a service like Heroku, AWS, or DigitalOcean
7. Deploy frontend to Vercel, Netlify, or similar

## Troubleshooting

### CORS Errors
Make sure `CORS_ALLOWED_ORIGINS` in `backend/config/settings.py` includes your frontend URL.

### Images Not Loading
Check that:
- Images are uploaded to the correct media folder
- `MEDIA_URL` and `MEDIA_ROOT` are correctly configured
- Your server is serving media files

### 404 on Admin Routes
Make sure you're accessing `/admin/` (with trailing slash) and have logged in via Django admin first.

## Future Enhancements

- [ ] Schedule/Timetable management
- [ ] Programs/pricing management
- [ ] Gallery with multiple image uploads
- [ ] Email notifications
- [ ] Member registration system
- [ ] Payment integration
- [ ] Social media feeds
- [ ] Analytics dashboard

## License

This project is proprietary to FC Dominators.

## Support

For issues or questions, contact the development team.
