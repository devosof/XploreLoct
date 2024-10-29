import express from 'express';
import dotenv from 'dotenv';
import knex from 'knex';
import cors from "cors";

// cors configuration (production level configuration)

dotenv.config({
    path: './.env'
});

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// data will come from different sources such as json, body, form , url etc.
app.use(express.json({limit: "16kb"})) // to config that we are accepting json.
// to handle data from URL
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// to use static files usually from public folder
app.use(express.static("public"))






// routes import
import userRoutes from './routes/user.routes.js';
import eventRoutes from './routes/event.routes.js';
import errorHandler from './middlewares/error.middleware.js';



app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use(errorHandler); // Error handling middleware

export default app;
