import express from 'express';
import DYuser from '../models/user.js';

export const updateUser = async(req,res)=>{
    if(req.params.id === req.user.id){
        try{

            const updatedUser = await DYuser.findByIdAndUpdate(req.user.id,{
                $set: req.body
            },{new: true});
            return res.status(200).json("User updated successfully!");

        }catch(err){
            return res.status(400).json(err);
        }
    }
    else{
        return res.status(500).json({message: "You are not allowed to update other users."});
    }
}
export const deleteUser = async (req,res)=>{
    if(req.params.id === req.user.id){
        try{

            const deleteUser = await DYuser.findByIdAndDelete(req.user.id);
            return res.status(200).json("User Deleted successfully!");

        }catch(err){
            return res.status(400).json(err);
        }
    }
    else{
        return res.status(500).json({message: "You are not allowed to Delete other user."});
    }
}
//DOES NOT NEED AUTHENTICATION
export const getUser = async(req,res)=>{
    try{
        const getuser = await DYuser.findById(req.params.id);
        return res.status(200).json(getuser);
    }
    catch(err){
        return res.status(400).json("error in getting user");
    }
}

export const subscribe = async (req, res) => {
    try {
      await DYuser.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id },
      });
      await DYuser.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 },
      });
      res.status(200).json("Subscription successfull.")
    } catch (err) {
      res.status(500).json("Error updating");
    }
  };

  export const unsubscribe = async (req, res) => {
    try {
      try {
        await DYuser.findByIdAndUpdate(req.user.id, {
          $pull: { subscribedUsers: req.params.id },
        });
        await DYuser.findByIdAndUpdate(req.params.id, {
          $inc: { subscribers: -1 },
        });
        res.status(200).json("Unsubscription successfull.")
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
};

export const likeVideo = (req,res)=>{

}
export const dislikeVideo = (req,res)=>{

}

