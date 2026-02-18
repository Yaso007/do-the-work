import express from 'express';
import authMiddleware from  '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/',(req,res) => {
    res.send("hello world")
})

export default router;