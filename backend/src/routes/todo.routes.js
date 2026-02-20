import express from 'express';
import authMiddleware from  '../middlewares/auth.middleware.js';
import * as todoController from '../controllers/todo.controller.js';



const router = express.Router();

router.use(authMiddleware);

router.get('/',(req,res) => {
    res.send("hello world")
})

router.post('/createTodo', todoController.createTodo);
router.get('/getTodo', todoController.getTodos);
router.put('/updateTodo/:id',todoController.updateTodo);
router.delete('/deleteTodo/:id', todoController.deleteTodo);

export default router;