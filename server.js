const express = require ('express'); 
const mongoose = require ('mongoose')

const dburi = "mongodb+srv://AbdullahDB:db.key@cluster0.bmuva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.error("MongoDB Connection Failed:", err));

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required : true,
        },
        email: {
            type : String, 
            required : true,
            unique : true
        }, 
        password: {
            type : String, 
            required : true, 
        }, 
        createdAt : {
            type : Date, 
            default: Date.now,
        }, 
        profilePhoto: {
            type : String, 

        },
        bio : {
            type : String, 
        },
});


const User = mongoose.model('User', userSchema) 
module.export = User;

const app = express();
const cors = require('cors');
app.use(cors());
app.get("/api", (req, res)=>{
    res.json({"users":["Abdullah", "Muhammad", "Abdullah"]});
}); 


app.listen(5000, () =>{console.log('Eventta Server is running on port 5000')});
