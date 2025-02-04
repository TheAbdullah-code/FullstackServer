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
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    profilePhoto: {
        type: String,
    },
    bio: {
        type: String,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

const app = express();
app.use(cors());

app.get("/api", (req, res) => {
    res.json({ "users": ["Abdullah", "Muhammad", "Abdullah"] });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
