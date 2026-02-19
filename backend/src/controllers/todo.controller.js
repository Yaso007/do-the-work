import * as todoService from '../services/todo.service.js';

export const createTodo = async (req, res, next) => {
    try{
        const {title, priority} = req.body;
        
        const todo = await todoService.createTodo(
            req.user.id,
            title,
            priority
        );

        res.status(201).json(todo);
    }catch (error){
        next(error);
    }
}

export const getTodos = async (req,res, next) => {
    try {
        const todos = await todoService.getTodosByUserId(req.user.id)
        res.json(todos);
    }catch (error){

        next(error);
    }


}
export const updateTodo = async (req, res, next) =>{
    try{
        const todo = await todoService.updateTodo(
            req.user.id,
            req.params.id,
            req.body
        )

        if(!todo){
            return res.status(404).json({
                message:'Todo not found'
            })
        }
        res.json(todo);
    }catch (error) {
        next(error);
    }
}

export const deleteTodo = async (req, res, next) => {
    try{
        const todo = await todoService.deleteTodo(
            req.user.id,
            req.params.id
        );

        if(!todo){
            return res.status(404).json({
                messge: 'Todo not found'
            })
        }

        res.json({
            message: 'Todo deleted'
        });

    }catch (error) {
        next(error);
    }
};
