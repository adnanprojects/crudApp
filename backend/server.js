import express from 'express';
import 'dotenv/config.js';
import mongoose from 'mongoose';
import { postsRoutes } from './routes/postsRoutes.js';
import { usersRoutes } from './routes/usersRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, 'localhost', () => console.log(`Server is running on PORT ${PORT}`)))
    .catch((error) => console.log('Error', error));


const PORT = process.env.PORT || 4000;