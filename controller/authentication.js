import mongoose from 'mongoose';
import DYuser from '../models/User.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export const signup = async(req, res)=>{
    try{
        console.log(req.body);
        const hashPass = await bcrypt.hashSync(req.body.password, 8);
        const newUser = new DYuser(req.body);
        newUser.password = hashPass;
        console.log("saving new user");
        await newUser.save();
        console.log(newUser);

        return res.status(202).json({ message: "User created successfully" });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    };
    
}

export const signin = async(req, res)=>{
    try{
        const user = await DYuser.findOne({name: req.body.name});

        if(!user){
            console.log("user not found");
            return res.status(404).json({ message: "user not found" });
        }

        const check = await bcrypt.compare(req.body.password, user.password);
        if(check){
            console.log("password matched");
        
            const token = jwt.sign({id: user._id}, process.env.JWT_KEY);   

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(user);
        }
        else{
            console.log("password not matched");
            return res.status(404).json({ message: "password not matched"});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: "Signin Failed" });
    }
}


export const googleAuth = async (req, res) => {
    try {
        const user = await DYuser.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

            res.cookie("access_token", token, {
                httpOnly: true,
                secure: true // Uncomment this only if you're serving over HTTPS
            }).status(200).json(user);
        } else {
            const temp = new DYuser({
                ...req.body,
                password: "1234"
            });
            const saveUser = await temp.save();

            const token = jwt.sign({ id: saveUser._id }, process.env.JWT_KEY);

            res.cookie("access_token", token, {
                httpOnly: true,
                sameSite: 'None', // Add this line
                secure: true // Uncomment this only if you're serving over HTTPS
            }).status(200).json(saveUser);
        }
    } catch (err) {
        console.log(err);
    }
};
