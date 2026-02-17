import {Pool} from 'pg'

const pool = new Pool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process_env_DB_USER,
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