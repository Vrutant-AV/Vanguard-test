# Vanguard Apparel Backend API

A robust Node.js/Express backend API for the Vanguard Apparel e-commerce platform with PostgreSQL database.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Product Management**: Full CRUD operations for products and categories
- **Order Processing**: Complete order management system
- **User Management**: Customer profiles and admin user management
- **Review System**: Product reviews and ratings
- **Security**: Helmet, CORS, rate limiting, input validation
- **Database**: PostgreSQL with connection pooling

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone and setup**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=vanguard_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

3. **Database Setup**:
   ```bash
   # Create database (run in PostgreSQL)
   CREATE DATABASE vanguard_db;
   
   # Run migrations
   npm run migrate
   
   # Seed initial data
   npm run seed
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update order status (Admin)
- `GET /api/orders/admin/all` - Get all orders (Admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Change password
- `GET /api/users` - Get all users (Admin)
- `PATCH /api/users/:id/role` - Update user role (Admin)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## Database Schema

### Users
- `id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`

### Categories
- `id`, `name`, `slug`, `description`, `status`, `created_at`, `updated_at`

### Products
- `id`, `name`, `description`, `price`, `category_id`, `stock_quantity`, `sku`, `images`, `sizes`, `colors`, `status`, `created_at`, `updated_at`

### Orders
- `id`, `user_id`, `total_amount`, `status`, `shipping_address`, `billing_address`, `created_at`, `updated_at`

### Order Items
- `id`, `order_id`, `product_id`, `quantity`, `price`, `size`, `color`, `created_at`

### Reviews
- `id`, `user_id`, `product_id`, `rating`, `title`, `comment`, `created_at`, `updated_at`

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: express-validator for request validation
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Configured for frontend integration
- **Helmet**: Security headers
- **SQL Injection Protection**: Parameterized queries

## Default Admin Account

After running the seed script:
- **Email**: admin@vanguard.com
- **Password**: admin123

## Development

```bash
# Start development server with auto-reload
npm run dev

# Run migrations
npm run migrate

# Seed database
npm run seed

# Start production server
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 5432 |
| `DB_NAME` | Database name | vanguard_db |
| `DB_USER` | Database user | postgres |
| `DB_PASSWORD` | Database password | - |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRES_IN` | JWT expiration | 7d |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## Error Handling

The API includes comprehensive error handling:
- Validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Server errors (500)

All errors return JSON responses with appropriate status codes and messages.