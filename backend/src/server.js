import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
dotenv.config();




const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();



//middleware to parse JSON bodies

//for development environment, allow CORS from the frontend
if(process.env.NODE_ENV === "development"){
    app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
}));
}

app.use(express.json());

app.use(rateLimiter);

app.use((req, res, next) => {
    console.log("We just got a new request!");
    console.log(`Method: ${req.method}, URL: ${req.url}`);
    next();
});

app.use("/api/notes", notesRoutes);

// Serve static files from the frontend build directory in production
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

}


connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server is running on port",PORT);
});
});
