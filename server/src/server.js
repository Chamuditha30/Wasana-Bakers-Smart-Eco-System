import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server root (1 level up from src/)
const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath });

console.log("📁 Loading .env from:", envPath);
console.log("🔑 PORT:", process.env.PORT);
console.log("🔑 MONGO_URI exists:", !!process.env.MONGO_URI);

// Import after dotenv is loaded
import { connectDatabase } from "./config/db.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // ✅ Connect database (uncommented!)
    await connectDatabase();

    // Run server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
