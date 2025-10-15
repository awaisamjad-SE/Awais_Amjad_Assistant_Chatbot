# 🍽️ Hostel Mess Management System

A comprehensive digital solution for managing hostel mess operations with QR code-based student identification, meal logging, and advanced analytics.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Frontend Implementation](#frontend-implementation)
- [Backend Specifications](#backend-specifications)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Business Logic](#business-logic)
- [Security & Authentication](#security--authentication)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

The Hostel Mess Management System streamlines meal ordering and tracking processes using QR code technology. Students generate personal QR codes, staff scan them for quick identification, and the system handles meal logging with automatic price validation and comprehensive analytics.

### Key Objectives:
- **Digitize** meal ordering and tracking processes
- **Eliminate** manual record-keeping errors
- **Provide** real-time analytics and reporting
- **Ensure** accurate pricing and inventory management
- **Track** student consumption patterns

## ✨ Features

### 🎯 Core Features
- **QR Code Generation**: Personal QR codes for each student
- **QR Code Scanning**: Camera-based scanning with auto-stop functionality
- **Meal Logging**: Automated meal entry with price validation
- **Meal History**: Complete consumption history with filtering
- **Price Validation**: Automatic price calculation and verification
- **Student Verification**: Real-time student ID validation

### 📊 Analytics & Reporting
- **Visual Charts**: Bar charts, pie charts, and line graphs
- **Advanced Filtering**: 6 comprehensive filter options
- **Real-time Statistics**: Daily, weekly, and monthly summaries
- **Spending Analysis**: Individual and aggregate spending patterns
- **Food Item Tracking**: Popular items and consumption trends

### 🔧 Advanced Features
- **Multi-parameter Sorting**: Sort by date, price, quantity, food item
- **Responsive Design**: Mobile and desktop compatibility
- **Real-time Updates**: Instant data refresh and validation
- **Activity Logging**: Complete audit trail of all operations
- **Role-based Access**: Admin vs General user permissions

## 🛠️ Tech Stack

### Frontend (React)
- **React 19.1.1** - Modern UI framework
- **React Router DOM 7.9.3** - Client-side routing
- **Chart.js & React-Chart.js-2** - Data visualization
- **HTML5-QRCode** - QR code scanning functionality
- **QRCode.react** - QR code generation
- **Vite** - Fast build tool and development server

### Backend Specifications (Django)
- **Django 4.2+** - Python web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Primary database
- **Redis** - Caching layer
- **Celery** - Background task processing
- **JWT Authentication** - Secure token-based auth

### Development Tools
- **ESLint** - Code linting
- **Vite** - Module bundler
- **npm** - Package management
- **Git** - Version control

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Django)      │◄──►│  (PostgreSQL)   │
│                 │    │                 │    │                 │
│ • QR Scanner    │    │ • API Endpoints │    │ • Students      │
│ • Meal Forms    │    │ • Validation    │    │ • Food Items    │
│ • Analytics     │    │ • Authentication│    │ • Meal Logs     │
│ • Charts        │    │ • Logging       │    │ • Summaries     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │     Redis       │
                    │   (Caching)     │
                    └─────────────────┘
```

## 🎨 Frontend Implementation

### Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatBot.jsx
│   │   ├── ChatMessage.jsx
│   │   ├── VoiceRecorder.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       └── Input.jsx
│   └── pages/
│       └── Index.jsx
│
hostel-mess/
├── src/
│   ├── Components/
│   │   ├── CameraQRScanner.jsx
│   │   ├── ManualStudentIdInput.jsx
│   │   ├── MealForm.jsx            # Enhanced with validation
│   │   ├── MealHistory.jsx         # Advanced filtering & charts
│   │   ├── Navbar.jsx
│   │   ├── QRGenerator.jsx
│   │   ├── QRScanner.jsx           # Auto-stop functionality
│   │   └── SimpleCameraQRScanner.jsx
│   └── pages/
│       ├── ComprehensiveHome.jsx   # All-in-one interface
│       ├── GenerateQRPage.jsx
│       ├── Home.jsx
│       ├── MealHistoryPage.jsx
│       ├── MealSelectionPage.jsx
│       └── ScanQRPage.jsx
```

### Key Components

#### 1. Enhanced MealForm Component
```jsx
// Features:
- Complex nested JSON response parsing
- Proper `valid: true/false` checking
- Error message extraction from API responses
- Success/failure handling based on API response structure
- Loading states with disabled buttons
```

#### 2. Advanced MealHistory Component
```jsx
// Features:
- 6 comprehensive filters (date range, food item, price range, quantity range, sorting)
- 4 interactive charts (bar chart, pie chart, daily/monthly trends)
- Real-time statistics dashboard
- Clickable table headers for sorting
- Responsive grid layout
```

#### 3. Improved QRScanner Component
```jsx
// Features:
- Automatic camera stop after successful scan
- Start/Stop scanner buttons
- Better user feedback with success messages
- Proper cleanup on component unmount
```

### Food Options & Pricing
```javascript
const foodOptions = {
  "Chicken Curry": 150,
  "Rice": 50,
  "Salad": 30,
  "Dal": 40,
  "Roti": 20,
  "Vegetable": 60
};
```

## 🔧 Backend Specifications

### Database Models

#### 1. Student Model
```python
class Student(models.Model):
    student_id = models.CharField(max_length=20, unique=True, primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True)
    hostel_block = models.CharField(max_length=10)
    room_number = models.CharField(max_length=10)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

#### 2. Food Items Model
```python
class FoodItem(models.Model):
    name = models.CharField(max_length=100, unique=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50)
    is_available = models.BooleanField(default=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
```

#### 3. Meal Log Model
```python
class MealLog(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    logged_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
```

#### 4. Activity Log Model
```python
class ActivityLog(models.Model):
    ACTION_CHOICES = [
        ('ADD_MEAL', 'Add Meal'),
        ('FETCH_HISTORY', 'Fetch History'),
        ('GENERATE_QR', 'Generate QR Code'),
        ('LOGIN', 'User Login'),
        ('ADMIN_ACTION', 'Admin Action'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    target_student_id = models.CharField(max_length=20, blank=True)
    details = models.JSONField(default=dict)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
```

## 🚀 API Endpoints

### 1. QR Code Generation
```http
POST /api/generate-qr/
Content-Type: application/json
Authorization: Bearer <admin_token>

{
    "student_id": "12"
}
```

**Response:**
```json
{
    "success": true,
    "qr_code_data": "12",
    "qr_code_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "student_name": "John Doe",
    "message": "QR Code generated successfully"
}
```

### 2. Meal Logging
```http
POST /api/log-meal/
Content-Type: application/json
Authorization: Bearer <admin_token>

{
    "student_id": "12",
    "food_item": "Rice",
    "quantity": 2,
    "total_price": 100
}
```

**Success Response:**
```json
{
    "valid": true,
    "student_id": "12",
    "food_item": "Rice",
    "quantity": 2,
    "unit_price": 50,
    "total_price": 100,
    "date": "2025-10-05",
    "timestamp": "2025-10-05T14:30:00Z",
    "message": "Meal logged successfully"
}
```

**Error Response:**
```json
{
    "valid": false,
    "error": "Student ID not found",
    "student_id": "99",
    "food_item": "Rice",
    "quantity": 2,
    "total_price": 100
}
```

### 3. Fetch Meal History
```http
GET /api/meal-history/{student_id}/
Content-Type: application/json
Authorization: Bearer <token>

{
    "student_id": "12",
    "request_type": "fetch_meals"
}
```

**Response:**
```json
{
    "valid": true,
    "student_id": "12",
    "student_name": "John Doe",
    "total_meals": 15,
    "total_spent": 1450.00,
    "meals": [
        {
            "food_item": "Chicken Curry",
            "quantity": 2,
            "unit_price": 150,
            "total_price": 300,
            "date": "2025-10-05",
            "timestamp": "2025-10-05T14:30:00Z"
        }
    ]
}
```

### 4. Advanced Filtering
```http
POST /api/meal-history/filter/
Content-Type: application/json
Authorization: Bearer <token>

{
    "student_id": "12",
    "filters": {
        "date_from": "2025-10-01",
        "date_to": "2025-10-05",
        "food_item": "Chicken",
        "min_price": 100,
        "max_price": 500,
        "min_quantity": 1,
        "max_quantity": 5
    },
    "sort_by": "date",
    "sort_order": "desc"
}
```

## 🔒 Security & Authentication

### User Types & Permissions
- **Admin Users**: Full CRUD access to all endpoints
- **General Users**: Only fetch meal history by student ID

### Security Features
- JWT token-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Rate limiting
- Activity logging and monitoring

### Custom User Model
```python
class CustomUser(AbstractUser):
    user_type = models.CharField(max_length=20, choices=[
        ('ADMIN', 'Admin'),
        ('GENERAL', 'General')
    ], default='GENERAL')
    is_admin = models.BooleanField(default=False)
```

## 🧠 Business Logic

### Meal Logging Validation Process
```python
def validate_and_log_meal(data):
    # 1. Student Validation
    student = Student.objects.filter(student_id=data['student_id']).first()
    if not student:
        return {"valid": False, "error": "Student ID not found"}
    
    # 2. Food Item Validation
    food_item = FoodItem.objects.filter(name=data['food_item']).first()
    if not food_item:
        return {"valid": False, "error": "Food item not found"}
    
    # 3. Price Validation
    expected_total = food_item.unit_price * data['quantity']
    if data['total_price'] != expected_total:
        return {
            "valid": False, 
            "error": "Total price mismatch",
            "expected_total": expected_total
        }
    
    # 4. Log Meal
    meal_log = MealLog.objects.create(
        student=student,
        food_item=food_item,
        quantity=data['quantity'],
        unit_price=food_item.unit_price,
        total_price=data['total_price'],
        logged_by=request.user
    )
    
    # 5. Update Summaries
    update_daily_weekly_summaries()
    
    return {"valid": True, "meal_id": meal_log.id}
```

### QR Code Generation Logic
```python
import qrcode
from io import BytesIO
import base64

def generate_qr_code(student_id):
    student = Student.objects.get(student_id=student_id)
    
    # Generate QR with only student ID
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(student_id)
    qr.make()
    
    img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    
    return {
        "qr_code_data": student_id,
        "qr_code_url": f"data:image/png;base64,{base64.b64encode(buffer.getvalue()).decode()}",
        "student_name": student.name
    }
```

## 📊 Analytics Features

### Filtering Options (6 Filters)
1. **📅 Date Range Filter** - Filter meals between specific dates
2. **🍽️ Food Item Search** - Search by food item name (case-insensitive)
3. **💰 Price Range Filter** - Filter by minimum and maximum price
4. **📊 Quantity Range Filter** - Filter by minimum and maximum quantity
5. **🔄 Sort Options** - Sort by date, price, quantity, or food item
6. **⬆️⬇️ Sort Order** - Ascending or descending order

### Chart Types (4 Visualizations)
1. **📊 Food Items Bar Chart** - Shows quantity vs price for each food item
2. **🥧 Spending Distribution Pie Chart** - Visual breakdown of spending by food type
3. **📅 Daily Spending Trend Line Chart** - Shows daily spending patterns over time
4. **📈 Monthly Spending Trend Line Chart** - Shows monthly spending overview

### Statistics Dashboard
- **📊 Total Meals Count** - Shows filtered meal count
- **💰 Total Amount Spent** - Sum of filtered meals
- **📈 Average Per Meal** - Average cost per meal
- **Real-time filtering** - All charts and stats update instantly

## 🚀 Installation & Setup

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/awaisamjad-SE/Awais_Amjad_Assistant_Chatbot.git
cd Awais_Amjad_Assistant_Chatbot

# Setup React frontend
cd frontend
npm install
npm run dev

# Setup hostel-mess React app
cd ../hostel-mess
npm install
npm run dev
```

### Backend Setup (Django)
```bash
# Create Django project
django-admin startproject hostel_mess_backend
cd hostel_mess_backend

# Install dependencies
pip install django djangorestframework
pip install psycopg2-binary redis celery
pip install djangorestframework-simplejwt
pip install qrcode[pil] pillow

# Setup database
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver
```

### Environment Variables
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/hostel_mess_db

# Redis
REDIS_URL=redis://localhost:6379/0

# JWT
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret

# Debug
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

## 📱 Usage Guide

### For Students
1. **Generate QR Code**: Enter your student ID to generate a personal QR code
2. **Present QR Code**: Show your QR code to mess staff for scanning
3. **View History**: Check your meal consumption history and spending

### For Staff (Admin)
1. **Scan QR Codes**: Use the scanner to identify students quickly
2. **Log Meals**: Select food items and quantities for each student
3. **Validate Prices**: System automatically validates pricing
4. **View Analytics**: Access comprehensive reports and statistics

### System Workflow
```
Student generates QR → Staff scans QR → System validates student → 
Staff selects meals → System validates prices → Meal logged → 
Summaries updated → History available for viewing
```

## 🧪 Testing

### Unit Tests
- Model validation tests
- API endpoint tests
- Business logic tests
- Authentication tests

### Integration Tests
- End-to-end meal logging flow
- QR code generation and scanning
- Data consistency tests

### Test Commands
```bash
# Run all tests
python manage.py test

# Run specific test files
python manage.py test apps.meals.tests

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

## 🚢 Deployment

### Docker Setup
```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - db
      - redis
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/hostel_mess

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: hostel_mess
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## 📝 API Response Formats

### Current N8N Webhook Format
The system currently handles complex nested JSON responses from N8N webhooks:

```json
[{
  "output": "```json\n[{\n \"output\": {\n \"valid\": true,\n \"student_id\": \"1\",\n \"food_item\": \"Chicken Curry\",\n \"quantity\": 1,\n \"total_price\": 150\n }\n}]\n```"
}]
```

### Standardized Django API Format
The Django backend will provide clean, consistent responses:

```json
{
  "valid": true,
  "student_id": "1",
  "food_item": "Chicken Curry",
  "quantity": 1,
  "total_price": 150,
  "timestamp": "2025-10-05T14:30:00Z"
}
```

## 🔄 Migration Path

### Phase 1: Django Backend Development
- Implement all models and API endpoints
- Set up authentication and permissions
- Create admin interface

### Phase 2: Frontend Integration
- Update React components to use Django APIs
- Replace N8N webhook calls with Django endpoints
- Implement proper error handling

### Phase 3: Testing & Deployment
- Comprehensive testing of all features
- Performance optimization
- Production deployment

## 📈 Future Enhancements

### Planned Features
- **Mobile App**: Native iOS and Android applications
- **Payment Integration**: Digital payment processing
- **Inventory Management**: Real-time stock tracking
- **Nutrition Tracking**: Calorie and nutrition information
- **AI Recommendations**: Personalized meal suggestions
- **Multi-language Support**: Localization for different languages

### Technical Improvements
- **Microservices Architecture**: Split into smaller services
- **GraphQL API**: More efficient data fetching
- **Real-time Notifications**: WebSocket-based updates
- **Advanced Analytics**: Machine learning insights
- **Offline Support**: Progressive Web App capabilities

## 🤝 Contributing

### Development Guidelines
1. Follow Django and React best practices
2. Write comprehensive tests for new features
3. Update documentation for API changes
4. Use consistent code formatting
5. Create detailed commit messages

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Update documentation
5. Submit a pull request

## 📞 Support & Contact

- **Project Owner**: Awais Amjad
- **GitHub**: [@awaisamjad-SE](https://github.com/awaisamjad-SE)
- **Email**: awaisamjad.official@gmail.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎉 Acknowledgments

- React team for the excellent frontend framework
- Django team for the robust backend framework
- Chart.js for beautiful data visualizations
- QR code libraries for seamless integration
- Open source community for continuous support

---

**Built with ❤️ for efficient hostel mess management**