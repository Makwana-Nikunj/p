
import dotenv from "dotenv"
dotenv.config()

import { server } from './app.js'
import { connectToDatabase } from "./db/index.js";

const port = process.env.PORT || 8000;

// Start server immediately so Render passes health checks
server.listen(port, "0.0.0.0", () => {
    console.log(`⚙️ Server is running at port : ${port}`);
});

// Connect to DB asynchronously 
connectToDatabase()
    .catch((err) => {
        console.log("psql db connection failed !!! ", err);
    });
