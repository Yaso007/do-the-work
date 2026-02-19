import express from 'express';
import authMiddleware from  '../middlewares/auth.middleware.js';
import * as todoController from '../controllers/todo.controller.js';



const router = express.Router();

router.use(authMiddleware);

router.get('/',(req,res) => {
    res.send("hello world")
})

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.put('/',todoController.updateTodo);
router.delete('/', todoController.deleteTodo)

export default router;