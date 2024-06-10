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

app.use(cors({
    origin: 'https://dinki-tube-server.vercel.app', // Use the client origin from environment variables
    credentials: true // Allow credentials (cookies) to be sent
}));

dotenv.config();

const connect = ()=>{

    mongoose.connect(process.env.MONGODB).then(()=>{
        console.log('Database connected successfully');
    }).catch( (err) => {
        console.error(err, 'cant connect to Database');
    });
}

app.use(cookieParser());

app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/videos', videoRoute);
app.use('/api/comments', commentRoute);
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    connect();
    console.log("connected to server!");
})
