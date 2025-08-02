# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Format

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

#### POST /auth/login
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

#### GET /auth/validate
Validate JWT token and get user info.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

### Books

#### GET /books/categories
Get available book categories.

**Response:**
```json
{
  "categories": [
    "Children's Stories",
    "Cookbooks",
    "Adventure Books",
    "Science Fiction",
    "Romance",
    "Mystery",
    "Biography",
    "Self-Help",
    "Educational",
    "Fantasy"
  ]
}
```

#### POST /books
Create a new book. **Requires authentication.**

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "My Amazing Book",
  "category": "Children's Stories",
  "prompt": "A story about a magical adventure in a enchanted forest"
}
```

**Response:**
```json
{
  "message": "Book created successfully",
  "book": {
    "id": 1,
    "user_id": 1,
    "title": "My Amazing Book",
    "category": "Children's Stories",
    "prompt": "A story about a magical adventure in a enchanted forest",
    "content": "Generated book content...",
    "status": "generated",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /books/my-books
Get all books for the authenticated user. **Requires authentication.**

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "books": [
    {
      "id": 1,
      "user_id": 1,
      "title": "My Amazing Book",
      "category": "Children's Stories",
      "prompt": "A story about a magical adventure",
      "content": "Generated content...",
      "status": "generated",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /books/:id
Get a specific book by ID. **Requires authentication and ownership.**

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "book": {
    "id": 1,
    "user_id": 1,
    "title": "My Amazing Book",
    "category": "Children's Stories",
    "prompt": "A story about a magical adventure",
    "content": "Generated content...",
    "status": "generated",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /books/:id
Update a book. **Requires authentication and ownership.**

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Book Title",
  "content": "Updated content...",
  "status": "published"
}
```

**Response:**
```json
{
  "message": "Book updated successfully",
  "book": {
    "id": 1,
    "title": "Updated Book Title",
    "content": "Updated content...",
    "status": "published",
    "updated_at": "2024-01-01T01:00:00.000Z"
  }
}
```

#### DELETE /books/:id
Delete a book. **Requires authentication and ownership.**

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Book deleted successfully"
}
```

#### POST /books/:id/export/pdf
Export book as PDF. **Requires authentication and ownership.**

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "PDF export initiated",
  "downloadUrl": "/exports/1.pdf",
  "note": "This is a stub implementation. PDF generation would be implemented here."
}
```

#### POST /books/:id/export/epub
Export book as EPUB. **Requires authentication and ownership.**

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "EPUB export initiated",
  "downloadUrl": "/exports/1.epub",
  "note": "This is a stub implementation. EPUB generation would be implemented here."
}
```

### Users

#### GET /users/profile
Get user profile. **Requires authentication.**

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /users/profile
Update user profile. **Requires authentication.**

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "first_name": "Jane",
  "last_name": "Smith"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "Jane",
    "last_name": "Smith",
    "updated_at": "2024-01-01T01:00:00.000Z"
  }
}
```

## Error Codes

- `400` - Bad Request (invalid input)
- `401` - Unauthorized (invalid or missing token)
- `403` - Forbidden (access denied)
- `404` - Not Found (resource not found)
- `500` - Internal Server Error

## Rate Limiting

Currently no rate limiting is implemented. This should be added for production use.

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.