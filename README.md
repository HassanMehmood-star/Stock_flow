<<<<<<< HEAD
# Stock Flow

A modern, full-stack inventory and order management system built with Django and Next.js.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [License](#license)

## 🎯 Overview

Stock Flow is a comprehensive solution for managing inventory, orders, customers, and business transactions. It provides a clean, intuitive interface for tracking products, managing ledger entries, and handling customer relationships efficiently.

## 🛠 Tech Stack

### Backend
- **Framework**: Django 3.x+ with Django REST Framework
- **Database**: SQLite (development) / PostgreSQL (production ready)
- **Language**: Python 3.x
- **API**: RESTful API architecture

### Frontend
- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: CSS with Tailwind CSS support
- **Package Manager**: npm/yarn
- **Build Tool**: ESLint + PostCSS

## ✨ Features

- **User Authentication**: Secure login and signup system
- **Dashboard**: Comprehensive overview of business metrics
- **Product Management**: Create, update, and manage product inventory
- **Order Management**: Track and manage customer orders
- **Customer Management**: Maintain customer profiles and information
- **Ledger System**: Record and track financial transactions
- **Responsive Design**: Fully responsive UI for desktop and mobile devices

## 📁 Project Structure

```
Stock Flow/
├── backend/                 # Django backend application
│   ├── config/             # Django configuration
│   ├── core/               # Main application logic
│   │   ├── models.py       # Database models
│   │   ├── serializers.py  # API serializers
│   │   ├── views.py        # API endpoints
│   │   └── migrations/     # Database migrations
│   ├── manage.py           # Django management script
│   └── db.sqlite3          # SQLite database
│
└── frontend/               # Next.js frontend application
    ├── app/               # Next.js app directory
    │   ├── dashboard/     # Dashboard pages
    │   ├── login/         # Authentication pages
    │   └── signup/
    ├── components/        # Reusable React components
    │   ├── auth/         # Auth-related components
    │   ├── dashboard/    # Dashboard components
    │   ├── marketing/    # Marketing page components
    │   └── ui/           # UI components
    ├── lib/              # Utility functions and API clients
    ├── public/           # Static assets
    └── package.json      # Dependencies
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **npm or yarn** - Comes with Node.js
- **pip** - Python package manager (comes with Python)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Stock Flow"
```

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create a superuser (admin account)
python manage.py createsuperuser
```

### 3. Setup Frontend

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
# or
yarn install
```

## 🏃 Running the Application

### Start the Backend Server

```bash
# From the backend directory with virtual environment activated
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Start the Frontend Development Server

```bash
# From the frontend directory
npm run dev
# or
yarn dev
```

The frontend will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login/` - User login
- `POST /api/auth/signup/` - User registration
- `POST /api/auth/logout/` - User logout

### Product Endpoints
- `GET /api/products/` - List all products
- `POST /api/products/` - Create a product
- `GET /api/products/<id>/` - Get product details
- `PUT /api/products/<id>/` - Update product
- `DELETE /api/products/<id>/` - Delete product

### Order Endpoints
- `GET /api/orders/` - List all orders
- `POST /api/orders/` - Create an order
- `GET /api/orders/<id>/` - Get order details
- `PUT /api/orders/<id>/` - Update order
- `DELETE /api/orders/<id>/` - Delete order

### Customer Endpoints
- `GET /api/customers/` - List all customers
- `POST /api/customers/` - Create a customer
- `GET /api/customers/<id>/` - Get customer details
- `PUT /api/customers/<id>/` - Update customer
- `DELETE /api/customers/<id>/` - Delete customer

### Ledger Endpoints
- `GET /api/ledger/` - List ledger entries
- `POST /api/ledger/` - Create ledger entry
- `GET /api/ledger/<id>/` - Get ledger entry details

## 📝 Environment Variables

Create `.env` files in both backend and frontend directories:

### Backend `.env`
```
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
SECRET_KEY=your-secret-key-here
```

### Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🧪 Testing

### Backend Tests
```bash
# From the backend directory
python manage.py test
```

## 🚢 Production Deployment

For production deployment:

1. Set `DEBUG=False` in Django settings
2. Configure allowed hosts properly
3. Use a production database (PostgreSQL recommended)
4. Use a production WSGI server (Gunicorn, uWSGI)
5. Build the frontend: `npm run build`
6. Configure CORS settings appropriately

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -am 'Add new feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Support

For support, please contact the development team or open an issue in the repository.

---

**Happy coding! 🚀**
=======
# Stock_flow
>>>>>>> 8d43e619c647a701a73203aa180f4e882adb2b49
