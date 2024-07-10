import express from 'express';
import { createPost, getPosts, deletePost, updatePost } from '../controllers/postsControllers.js';

const router = express.Router();

router.get('/', getPosts);

router.post('/', createPost);

router.delete('/:id', deletePost);

router.put('/:id', updatePost);

export { router as postsRoutes };