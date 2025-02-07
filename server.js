const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();


const PORT = process.env.PORT || 3000;
const dburi = process.env.MONGO_URI;

mongoose.connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
//08103644133
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.error("MongoDB Connection Failed:", err));


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    profilePhoto: { type: String },
    bio: { type: String },
});

const User = mongoose.model('User', userSchema);

const app = express();
app.use(cors());
app.use(express.json());

app.use (cors());
app.get("/api", (req, res) => {
    res.json({ "users": ["Abdullah", "Muhammad", "Abdullah"] });
});

const bcrypt = require("bcrypt");

app.post("/api/register", async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new User
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Store the hashed password
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});
module.exports = User;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
