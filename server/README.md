# Server Setup Instructions

## Environment Variables Required

Create a `.env` file in the server directory with the following variables:

```
MONGODB_URL=your_mongodb_connection_string_here
OPENAI_API_KEY=your_openai_api_key_here
```

## How to Get API Keys

### MongoDB URL
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your actual password

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account
3. Go to API Keys section
4. Create a new API key

## Running the Server

1. Install dependencies: `npm install`
2. Create `.env` file with your API keys
3. Start server: `npm start`

The server will run on port 8080.
