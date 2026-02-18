import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import to_do_routes from './routes/todo.routes.js';
import auth_routes from './routes/auth.routes.js';
const app = express();

//helmet is a middleware that is used so that informations from the server may not be leaked, like which tech stack is
//being used

app.use(helmet());
app.use(cors());


//for only development
if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
    //morgan is useful for logging request to server and the status code
}

//parse JSON to JavaScript Object
app.use(express.json());

app.get('/health',(req,res)=>{
    res.status(200).json({status: 'OK'});
});
app.use('/api/auth',auth_routes);

app.use('/api/todos',to_do_routes);

//404 handler
app.use((req,res,next)=>{
    res.status(404).json({
        message: `Route ${req.originalUrl} not found`,
    })
})

app.use((err,req,res,next) =>{
    console.err(err.stack);
    res.status(err.status || 500).json({
        message:err.message || 'Something went wrong',
    })
})

export default app;