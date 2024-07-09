import express from 'express';
import 'dotenv/config.js';
import mongoose from 'mongoose';
import { postsRoutes } from './routes/postsRoutes.js';
import { usersRoutes } from './routes/usersRoutes.js';

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017', { dbName: 'crud_db' })
    .then(() => console.log('db connected!'))
    .catch((error) => console.log('Error', error));

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, 'localhost', () => console.log(`Server is running on PORT ${PORT}`));