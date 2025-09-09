# AI Image Generator - MERN Stack

A full-stack AI image generator application built with the MERN stack (MongoDB, Express.js, React, Node.js) that uses Hugging Face Stable Diffusion for image generation and stores images directly (no Cloudinary).

## 🚀 Features

- Generate AI images using Hugging Face Inference API (Stable Diffusion)
- No external image hosting (images stored as data URIs or in DB)
- Share generated images with the community
- Responsive React frontend with Tailwind CSS
- MongoDB database for storing posts
- Mock image generation for development (when API keys are not configured)

## 🛠️ Technologies Used

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Hugging Face Inference API for image generation
- No Cloudinary (removed)
- CORS for cross-origin requests

### Frontend
- React with Vite
- Tailwind CSS for styling
- React Router for navigation

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Hugging Face API token (from https://huggingface.co/settings/tokens)

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd AI_Image_Generator
```

### 2. Install server dependencies
```bash
cd server
npm install
```

### 3. Install client dependencies
```bash
cd ../client
npm install
```

### 4. Environment Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
# MongoDB Connection
MONGODB_URL=mongodb://localhost:27017/ai-image-generator
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/ai-image-generator

# Hugging Face Token
HF_API_TOKEN=your_hf_api_token_here

# Server Configuration
PORT=5050
NODE_ENV=development
```

### 5. Getting API Keys

#### Hugging Face API Token:
1. Go to https://huggingface.co/settings/tokens
2. Sign up or log in
3. Create a token with read access
4. Set it as HF_API_TOKEN

## 🚀 Running the Application

### Development Mode

1. **Start the server** (from the `server` directory):
```bash
cd server
npm start
```
The server will run on http://localhost:5050

2. **Start the client** (from the `client` directory):
```bash
cd client
npm run dev
```
The client will run on http://localhost:5173

### Production Mode

For production deployment, you'll need to:
1. Build the client: `cd client && npm run build`
2. Serve the built files through your server
3. Set `NODE_ENV=production` in your environment variables

## 🔧 Recent Fixes Applied

### Issues Fixed:
1. **Wrong API Integration**: Changed from OpenAI DALL-E to DeepAI API
2. **Outdated Dependencies**: Removed unnecessary OpenAI package
3. **API Configuration**: Fixed environment variable names and API calls
4. **Error Handling**: Improved error handling for both APIs

### Key Changes Made:
- Updated `server/controllers/dalleController.js` to use DeepAI API
- Fixed FormData usage for DeepAI API calls
- Updated environment variable from `OPENAI_API_KEY` to `DEEPAI_API_KEY`
- Removed OpenAI dependency from package.json
- Added comprehensive error handling and fallback mock images

## 📁 Project Structure

```
AI_Image_Generator/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── mongodb/           # Database connection
│   ├── .env.example       # Environment variables template
│   └── package.json
└── README.md
```

## 🔍 API Endpoints

### Image Generation
- `POST /api/v1/post/generate-image` - Generate image using Hugging Face (returns base64 data URI)

### Posts
- `GET /api/v1/post` - Get all posts
- `POST /api/v1/post` - Create a new post

## 🐛 Troubleshooting

### Common Issues:

1. **Image not generating**:
   - Check if `HF_API_TOKEN` is set correctly in `.env`
   - Verify token permissions and that the model isn’t gated/busy
   - Check server console for error messages

3. **Database connection issues**:
   - Ensure MongoDB is running (if using local MongoDB)
   - Check `MONGODB_URL` in `.env`
   - Verify network connectivity for MongoDB Atlas

4. **CORS errors**:
   - Ensure client is running on allowed origins (localhost:5173, 5174, or 5175)
   - Check server CORS configuration

### Development Mode:
- If API keys are not configured, the app will show mock images
- Check browser console and server logs for detailed error messages
- Use the `.env.example` file as a template for your `.env` file

## 📝 Usage

1. **Generate Images**:
   - Enter a descriptive prompt
   - Click "Generate" to create an AI image
   - The image will be generated using Hugging Face; no Cloudinary is used

2. **Create Posts**:
   - Add your name and a prompt
   - Generate an image
   - Click "Create Post" to share with the community

3. **View Community Posts**:
   - Navigate to the home page to see all shared images
   - Browse through the community gallery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review server and client console logs
3. Ensure all environment variables are set correctly
4. Verify API keys are valid and have sufficient credits

---

**Note**: This application requires valid API keys for DeepAI and Cloudinary to function properly. Without these keys, the app will display mock images for development purposes.

## 📜 Changelog

- 2025-09-09
  - Switched image generation to OpenAI DALL·E 3 (`model: dall-e-3`).
  - Standardized image size to `1024x1024` (supported by DALL·E 3).
  - Requested `response_format: b64_json` to ensure base64 output.
  - Improved server error details to include raw API response for easier debugging.
