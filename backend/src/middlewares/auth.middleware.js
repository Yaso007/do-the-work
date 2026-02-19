import jwt from 'jsonwebtoken';
import express from 'express'

const authMiddleware = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message: 'Unauthorized'});
        }
        const token = authHeader.split(' ')[1];
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }catch (error){
        res.status(401).json({message: 'Unauthorized'});

    }

}
export default authMiddleware;