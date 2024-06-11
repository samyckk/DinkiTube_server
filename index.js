import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/users.js';
import videoRoute from './routes/videos.js';
import commentRoute from './routes/comments.js';
import authRoute from './routes/authentication.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

app.use(cors());

dotenv.config();

const connect = () => {
    console.log("checking");
    mongoose.connect("mongodb+srv://samyck:1234@blog-app.ywqvnes.mongodb.net/?retryWrites=true&w=majority&appName=blog-app", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connected successfully');
    }).catch(err => {
        console.error('Cannot connect to database:', err);
    });
}

app.use(cookieParser());

app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/videos', videoRoute);
app.use('/api/comments', commentRoute);
app.use('/api/auth', authRoute);

app.get('/hey', (req, res) => {
    res.send("Hello world");
});

const PORT = 8000;

console.log(".");

app.listen(PORT, ()=>{
    console.log("...");
    connect();
    console.log("connected to server!");
})
