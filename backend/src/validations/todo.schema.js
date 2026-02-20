import {z} from 'zod';

export const createTodoSchema = z.object(
    {
        title:z
        .string()
        .min(1, 'Title is required')
        .max(200, 'Title must be less than 200 characters'),

        priority:z
        .enum(['low', 'medium', 'high'])
        .optional()
    }
)

export const updateTodoSchema = z.object({
    title:z
    .string()
    .min(1, 'Title cannot be empty')
    .max(200)
    .optional(),

    priority: z
    .enum(['low', 'medium', 'high'])
    .optional(),

    completed:z
    .boolean()
    .optional()
});