// server/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));

// Routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DeepAI Image Generator!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Catch-all route
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 5050;

// Start server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
};

startServer();
