import express from 'express';
import { updateUser, deleteUser, getUser, subscribe, unsubscribe, likeVideo, dislikeVideo } from '../controller/user.js';
import { tokenChecker } from '../controller/verifyToken.js';



const router = express.Router();

//UPDATE A USER
router.put('/:id',tokenChecker, updateUser);

//DELETE A USER
router.delete('/:id', tokenChecker ,deleteUser);

//GET A USER
router.get('/find/:id', getUser);

//SUBSCRIBE A USER
router.put('/sub/:id',tokenChecker, subscribe);

//UNSUBSCRIBE A USER
router.put('/unsub/:id',tokenChecker, unsubscribe);

//Like a video
router.put('/like/:videoid', likeVideo);

//Dislike a video
router.put('/dislike/:videoid', dislikeVideo);

export default router;