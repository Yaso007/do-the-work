import dotenv from 'dotenv'
import app from './app.js';
import connectDB from './config/db.config.js';

dotenv.config()
const PORT = 8000;

const startServer = async () =>{
  try{
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  }
  catch (error){
    console.error(`Failed to start server`, error);
    process.exit(1);
  }
}

startServer();




