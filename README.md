# MediCare - Complete Healthcare Management System

MediCare is a full-stack healthcare management system that provides:
- Patient portal for booking appointments
- Doctor portal for managing schedules
- Admin dashboard for system management

## Features

### Patient Features
- Browse and search doctors by specialty
- Book appointments with doctors
- View appointment history
- Manage profile information
- Secure payment integration (Razorpay)
- Chatbot assistance

### Doctor Features
- Manage appointment schedule
- View patient details
- Update profile information
- Track appointments

### Admin Features
- Add/remove doctors
- View all appointments
- Manage system users
- Dashboard analytics

## Technology Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for image storage
- Multer for file uploads

### Admin Panel
- React.js with Vite
- Tailwind CSS
- Custom admin components

## Project Structure

```
MediCare/
├── admin/                # Admin dashboard
│   ├── public/           # Static assets
│   ├── src/              # React source code
│   │   ├── assets/       # Admin assets
│   │   ├── components/   # Reusable components
│   │   ├── context/      # Context providers
│   │   ├── pages/        # Page components
│   │   └── ...           # Other config files
├── backend/              # Node.js server
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Custom middlewares
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Main server file
├── frontend/             # Patient portal
│   ├── public/           # Static assets
│   ├── src/              # React source code
│   │   ├── assets/       # Frontend assets
│   │   ├── components/   # Reusable components
│   │   ├── contexts/     # Context providers
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Utility functions
│   │   └── ...           # Other config files
└── README.md             # Project documentation
```

## Installation

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB
- Cloudinary account (for image storage)
- Git

### Setup Instructions

1. Clone the repository:
```bash
git clone "https://github.com/rohit-gomase25/MediCare.git"
cd MediCare
```

2. Install dependencies for all parts:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin
cd ../admin
npm install
```

3. Configure environment variables:
Create `.env` files in each directory with required configurations.

**Backend .env example:**
```

PORT=4000
MONGODB_URI=your_mongodb_connection_stringw=majority&appName=Cluster0
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_keyID
RAZORPAY_KEY_SECRET=your_razorpay_keySECRET
CURRENCY=INR
CLIENT_SITE_URL=http://localhost:5173
```

4. Start the development servers:
```bash
# In separate terminals:

# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev

# Admin
cd ../admin
npm run dev
```

## Available Scripts

### Backend
- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server

### Frontend/Admin
- `npm run dev`: Start Vite development server

## Chatbot Feature

The MediCare application includes a chatbot feature designed to assist users with common queries and provide support. The chatbot can help with:

- Booking appointments
- Providing information about doctors and specialties
- Answering frequently asked questions

### How to Use the Chatbot

- The chatbot icon is located at the bottom right corner of the application interface
- Click on the icon to open the chat window
- Select from the suggested options to get instant responses

The chatbot is designed to enhance user experience by providing quick and efficient assistance.

## API Documentation

The backend provides RESTful APIs for:
- User authentication
- Doctor management
- Appointment booking
- Profile management






