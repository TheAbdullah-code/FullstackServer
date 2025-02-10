require('dotenv').config();
const express = require('express');
const path = require ('path')
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT;
const dbURI = process.env.MONGO_URI;

// Database Connection
// mongoose.connect(dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB Connected Successfully"))
// .catch(err => console.error("❌ MongoDB Connection Failed:", err));
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Idan DB bai samo connection ba cikin 5 seconds, ya daina kokari
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // Wannan zai dakatar da server idan DB connection ya kasa
    }
};

module.exports = connectDB;


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

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
