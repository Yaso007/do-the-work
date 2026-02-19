import * as authService from '../services/auth.service.js';
import bcrypt from 'bcrypt';
import jwt from  'jsonwebtoken';

export const register = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;
        const user = await authService.registerUser(name, email,password);

        res.status(201).json(user);

    } catch (error){
        next(error);
    }
};

export const login = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = await authService.findUserByEmail(email);
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials"});

        }

        const token = jwt.sign;(
            {id:user.id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );

        res.json({token})
        
    }catch (error){
        next(error);
    }

};
