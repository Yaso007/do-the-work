import {Pool} from 'pg'
import dotenv from 'dotenv'

dotenv.config()

console.log("DB ENV VALUES", {
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
})

const pool = new Pool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
})

const connectDB = async () => {
    try{
        await pool.query(`Select 1`);
        console.log('Database connected');

    }
    catch(error){
        console.error('Database connectionn failed')
        
    }
}
export default connectDB;
export {pool}