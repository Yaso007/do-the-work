import express from 'express';
import {pool} from '../config/db.config.js';

export const createTodo = async (useId, title, priority) => {
    const result = await pool.query(
        `
        INSERT INTO todos (title, user_id, urgency)
        VALUES ($1, $2, $3) RETURNING *
        `,
        [title,useId, priority]
    );

    return result.rows[0];
}

export const getTodosByUserId = async (userId) => {
    const result = await pool.query(
        `
        SELECT * FROM todos WHERE user_id = $1
        ORDER BY created_at DESC
        `,
        [userId]
        
    )
    return result.rows;
}

export const updateTodo = async (userId, todoId, updates) =>{
    const {title, completed, priority} = updates;

    const result = await pool.query(
        `
        UPDATE todos
        SET title = $1, completed = $2, urgency = $3
        WHERE user_id = $4 AND id = $5
        RETURNING *
        `,
        [title, completed, priority, userId, todoId]
    )
    return result.rows[0];
}

export const deleteTodo = async (userId, todoId) => {
    const result = await pool.query (
        `
        DELETE FROM todos
        WHERE user_id = $1 AND id = $2
        RETURNING *
        `,
        [userId, todoId]
    )
    return result.rows[0]
}