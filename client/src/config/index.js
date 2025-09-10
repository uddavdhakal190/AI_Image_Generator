// Configuration for different environments
const config = {
  development: {
    API_BASE_URL: 'http://localhost:5050',
  },
  production: {
    API_BASE_URL: 'https://ai-image-generator-backend-kj74.onrender.com',
  },
};

// Get current environment
const environment = import.meta.env.MODE || 'development';

// Export the appropriate config
export default config[environment] || config.development;
