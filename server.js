// require('dotenv').config();
require('dotenv').config({ path: './.env' });
const express = require('express');
const path = require ('path')
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const dbURI = process.env.MONGO_URI;


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Stop trying after 5 seconds
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

// Kiran function bayan an tabbatar da `.env` yana loading
if (process.env.MONGO_URI) {
    connectDB();
} else {
    console.error("❌ ERROR: MongoDB URI is not defined in .env file.");
}


// Middleware
// app.use(cors());

app.use(cors({ 
    origin: "*", // Ko kuma saka specific frontend URL: "https://myfrontend.com"
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API!" });
}); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});
// require('dotenv').config();
console.log("📌 MONGO_URI:", process.env.MONGO_URI); // DEBUGGING


// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
