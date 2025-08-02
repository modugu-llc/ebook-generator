#!/bin/bash

# E-book Generator API Test Script

API_BASE="http://localhost:5000/api"
EMAIL="test@example.com"
PASSWORD="testpass123"
FIRST_NAME="Test"
LAST_NAME="User"

echo "🧪 Testing E-book Generator API..."
echo ""

# Test 1: Health Check
echo "1️⃣ Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s "$API_BASE/health")
echo "Response: $HEALTH_RESPONSE"
echo ""

# Test 2: User Registration
echo "2️⃣ Testing user registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$API_BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"first_name\":\"$FIRST_NAME\",\"last_name\":\"$LAST_NAME\"}")

echo "Response: $REGISTER_RESPONSE"

# Extract token from response
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ Registration failed - no token received"
    exit 1
else
    echo "✅ Registration successful - token received"
fi
echo ""

# Test 3: Get Book Categories
echo "3️⃣ Testing book categories endpoint..."
CATEGORIES_RESPONSE=$(curl -s "$API_BASE/books/categories")
echo "Response: $CATEGORIES_RESPONSE"
echo ""

# Test 4: Create Book
echo "4️⃣ Testing book creation..."
BOOK_RESPONSE=$(curl -s -X POST "$API_BASE/books" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Test Adventure Book","category":"Adventure Books","prompt":"A thrilling story about brave explorers discovering a hidden treasure in an ancient temple."}')

echo "Response: $BOOK_RESPONSE"

# Extract book ID from response
BOOK_ID=$(echo $BOOK_RESPONSE | grep -o '"id":[0-9]*' | cut -d':' -f2)

if [ -z "$BOOK_ID" ]; then
    echo "❌ Book creation failed - no book ID received"
    exit 1
else
    echo "✅ Book creation successful - Book ID: $BOOK_ID"
fi
echo ""

# Test 5: Get User's Books
echo "5️⃣ Testing get user books..."
MY_BOOKS_RESPONSE=$(curl -s "$API_BASE/books/my-books" \
  -H "Authorization: Bearer $TOKEN")
echo "Response: $MY_BOOKS_RESPONSE"
echo ""

# Test 6: Get Specific Book
echo "6️⃣ Testing get specific book..."
SINGLE_BOOK_RESPONSE=$(curl -s "$API_BASE/books/$BOOK_ID" \
  -H "Authorization: Bearer $TOKEN")
echo "Response: $SINGLE_BOOK_RESPONSE"
echo ""

# Test 7: Export as PDF
echo "7️⃣ Testing PDF export..."
PDF_EXPORT_RESPONSE=$(curl -s -X POST "$API_BASE/books/$BOOK_ID/export/pdf" \
  -H "Authorization: Bearer $TOKEN")
echo "Response: $PDF_EXPORT_RESPONSE"
echo ""

# Test 8: Export as EPUB
echo "8️⃣ Testing EPUB export..."
EPUB_EXPORT_RESPONSE=$(curl -s -X POST "$API_BASE/books/$BOOK_ID/export/epub" \
  -H "Authorization: Bearer $TOKEN")
echo "Response: $EPUB_EXPORT_RESPONSE"
echo ""

# Test 9: Get User Profile
echo "9️⃣ Testing user profile..."
PROFILE_RESPONSE=$(curl -s "$API_BASE/users/profile" \
  -H "Authorization: Bearer $TOKEN")
echo "Response: $PROFILE_RESPONSE"
echo ""

echo "🎉 All API tests completed!"
echo ""
echo "💡 Next steps:"
echo "   - Start the frontend: cd frontend && npm run dev"
echo "   - Visit http://localhost:3000 to test the UI"
echo "   - Register a new account or login with: $EMAIL / $PASSWORD"