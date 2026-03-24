
import dotenv from "dotenv"
dotenv.config()

import { server } from './app.js'
import { connectToDatabase } from "./db/index.js";

// Environment validation
const requiredEnvVars = [
    'DATABASE_URL',
    'ACCESS_TOKEN_SECRET',
    'REFRESH_TOKEN_SECRET'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}

const port = process.env.PORT || 8000;

// Start server immediately so Render passes health checks
server.listen(port, "0.0.0.0", () => {
    console.log(`⚙️ Server is running at port : ${port}`);
});

// Connect to DB asynchronously
connectToDatabase()
    .catch((err) => {
        console.error("❌ Database connection failed:", err);
        process.exit(1);
    });
