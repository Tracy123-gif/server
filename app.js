import express from 'express';
import connectDB from './utils/db.js';
import router from './routes/userRoutes.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

connectDB();

app.use('/users', router);

export default app;
