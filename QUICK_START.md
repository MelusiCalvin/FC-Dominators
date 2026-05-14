# FC Dominators - Quick Start Guide

## Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

## Quick Start (5 minutes)

### Step 1: Backend Setup
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # Create admin account
python manage.py runserver
```
✅ Backend running at http://localhost:8000

### Step 2: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend running at http://localhost:3000

### Step 3: Access Admin
1. Go to http://localhost:3000/admin
2. Login with superuser credentials
3. Add players, coaches, and manage club info

## Key Features

📋 **Admin Dashboard** - Manage all content without Django admin
🖼️ **Image Uploads** - Upload player and coach photos
🎨 **Modern Design** - Dark theme with orange accents
📱 **Responsive** - Works on all devices
🔐 **Secure** - Authentication required for admin functions

## File Locations

- **Players Page**: `/admin/players`
- **Coaches Page**: `/admin/coaches`  
- **Club Settings**: `/admin/club-info`
- **Testimonials**: `/admin/testimonials`

## API Base URL
`http://localhost:8000/api`

## Need Help?
Check the main README.md for detailed documentation.
