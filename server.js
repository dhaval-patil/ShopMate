import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
// configure
dotenv.config()

// database config
connectDB();
//rest Object
const app = express();

// middlewares
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes)

//rest api
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Server</h1>')
})

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on PORT  ${PORT}`);
})