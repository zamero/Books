# Library Management System

A comprehensive full-stack library management application built with React, TypeScript, and Express.js. This application provides a beautiful, modern interface for browsing, searching, and managing book rentals.

![Library Management System](https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🚀 Features

### Frontend
- **Modern UI**: Beautiful, responsive design with smooth animations and micro-interactions
- **Book Discovery**: Advanced search functionality with filters (genre, author, year, rating)
- **Book Details**: Comprehensive book information with ratings, descriptions, and tags
- **User Authentication**: Secure login/registration system
- **Personal Library**: View and manage borrowed books with due dates and overdue notifications
- **Real-time Updates**: Instant feedback on book availability and rental status

### Backend (REST API)
- **RESTful API**: Clean, well-documented API endpoints
- **Authentication**: JWT-based authentication with secure password hashing
- **Book Management**: CRUD operations for books with search and filtering
- **Rental System**: Complete rental lifecycle management
- **Data Validation**: Comprehensive input validation and error handling
- **API Documentation**: Interactive Swagger documentation

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **ShadCN/UI** for modern, accessible components
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Date-fns** for date manipulation

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Swagger** for API documentation
- **Helmet** for security headers
- **CORS** for cross-origin requests

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the frontend (http://localhost:5173) and backend (http://localhost:3001) servers concurrently.

### Alternative: Start servers separately

**Backend:**
```bash
npm run dev:backend
```

**Frontend:**
```bash
npm run dev:frontend
```

## 📚 API Documentation

Once the backend is running, you can access the interactive API documentation at:
- **Swagger UI**: http://localhost:3001/api-docs
- **Health Check**: http://localhost:3001/health

### API Endpoints

#### Authentication
- `POST /v1/auth/login` - User login
- `POST /v1/auth/register` - User registration

#### Books
- `GET /v1/books` - Get all books with search/filter options
- `GET /v1/books/:bookId` - Get book details
- `POST /v1/books/:bookId/rent` - Rent a book (requires authentication)

#### Users
- `GET /v1/users/:userId/books` - Get user's borrowed books (requires authentication)

#### Rentals
- `POST /v1/rentals/:rentalId/return` - Return a book (requires authentication)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory (optional):

```env
# Backend Configuration
PORT=3001
JWT_SECRET=your-jwt-secret-key-here
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Demo Credentials

The application comes with pre-configured demo users:

**User 1:**
- Email: `john.doe@example.com`
- Password: `password123`

**User 2:**
- Email: `jane.smith@example.com`
- Password: `password123`

**Admin:**
- Email: `admin@library.com`
- Password: `admin123`

## 🎨 Design Features

### Visual Design
- **Modern Aesthetic**: Clean, professional design with subtle gradients and shadows
- **Responsive Layout**: Optimized for mobile, tablet, and desktop devices
- **Color System**: Comprehensive color palette with proper contrast ratios
- **Typography**: Hierarchical typography with proper spacing and readability

### User Experience
- **Smooth Animations**: Subtle hover effects and transitions
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: User-friendly error messages and fallbacks
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### Interactive Elements
- **Book Cards**: Hover effects revealing additional information
- **Search & Filters**: Real-time search with advanced filtering options
- **Modal Dialogs**: Smooth modal transitions for book details and user profile
- **Toast Notifications**: Non-intrusive feedback for user actions

## 🔒 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Tokens**: Secure authentication with token expiration
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: Protection against brute force attacks
- **Security Headers**: Helmet.js for enhanced security
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Frontend Build
```bash
npm run build
```

### Backend Build
```bash
npm run build:backend
```

### Production Start
```bash
npm run start:backend
```
## 🙏 Acknowledgments

- Icons from [Lucide](https://lucide.dev/)
- UI components from [ShadCN/UI](https://ui.shadcn.com/)

## 🐛 Known Issues

- Data is stored in memory and will reset on server restart
- No persistent database integration (can be easily added)
- Limited to sample book data (can be extended with real book APIs)

## 🔮 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real-time notifications
- [ ] Advanced search with fuzzy matching
- [ ] Book recommendations
- [ ] Reading history and statistics
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Email notifications for due dates
- [ ] Barcode scanning for book management
- [ ] Social features (reviews, ratings, sharing)

---

**Happy Reading! 📚**