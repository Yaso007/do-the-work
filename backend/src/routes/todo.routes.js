import express from 'express';
import authMiddleware from  '../middlewares/auth.middleware.js';
import * as todoController from '../controllers/todo.controller.js';
import {validate} from '../middlewares/validate.middleware.js';
import {
    createTodoSchema,
    updateTodoSchema
} from '../validations/todo.schema.js'



const router = express.Router();

router.use(authMiddleware);

router.get('/',(req,res) => {
    res.send("hello world")
})

router.post('/createTodo', validate(createTodoSchema),todoController.createTodo);
router.get('/getTodo', todoController.getTodos);
router.put('/updateTodo/:id',validate(updateTodoSchema),todoController.updateTodo);
router.delete('/deleteTodo/:id', todoController.deleteTodo);

export default router;