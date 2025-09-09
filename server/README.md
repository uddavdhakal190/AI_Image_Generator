# Server Setup Instructions

## Environment Variables Required

Create a `.env` file in the server directory with the following variables:

```
MONGODB_URL=your_mongodb_connection_string_here
HF_API_TOKEN=your_hugging_face_api_token
PORT=5050
```

## How to Get API Keys

### MongoDB URL
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your actual password

### Hugging Face API Token
1. Go to https://huggingface.co/settings/tokens
2. Create a token with read access
3. Set it as `HF_API_TOKEN`

## Running the Server

1. Install dependencies: `npm install`
2. Create `.env` file with your API keys
3. Start server: `npm start`

The server will run on port 5050 by default.
