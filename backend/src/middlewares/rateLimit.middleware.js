import rateLimit from  'express-rate-limit';

export const globalLimiter = rateLimit({
    windowMs: 15*60*1000,
    max:100,
    message:{
        message:'Too many requests, please try again later'
    },
    standardHeaders: true,
    legacyHeaders:false
});

export const authLimiter = rateLimit({
    windowMs:15*60*1000,
    max: 7,
    message:{
        message: 'Too many login attempts. Try again later.'
    },
    standardHeaders:true,
    legacyHeaders:false
});