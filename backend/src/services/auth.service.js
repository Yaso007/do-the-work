import {pool} from '../config/db.config.js';
import bcrypt from 'bcrypt';

export const registerUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, email, created_at
        `,
        [name, email, hashedPassword]

    );
    return result.rows[0];
};

export const findUserByEmail = async (email) => {
    const result = await pool.query(
        `
        SELECT * FROM users WHERE email = $1
        `,
        [email]
    )

    return result.rows[0];
}