import express from 'express';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';
import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use(errorHandler); // Error handling middleware

export default app;
