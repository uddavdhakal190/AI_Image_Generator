# Deployment Instructions for Render

## Backend Deployment

1. **Environment Variables Required:**
   - `MONGODB_URL`: Your MongoDB connection string
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `PORT`: Will be set automatically by Render

2. **Build Command:** (Leave empty - Render will use `npm start`)

3. **Start Command:** `npm start`

## Frontend Deployment

1. **Build Command:** `npm run build`

2. **Publish Directory:** `dist`

3. **Environment Variables:** None required (uses production config automatically)

## URLs

- **Frontend:** https://ai-image-generator-client-ollv.onrender.com
- **Backend:** https://ai-image-generator-backend-kj74.onrender.com

## Configuration

The application automatically detects the environment:
- **Development:** Uses `http://localhost:5050` for API calls
- **Production:** Uses `https://ai-image-generator-backend-kj74.onrender.com` for API calls

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:5173` (development)
- `https://ai-image-generator-client-ollv.onrender.com` (production)
