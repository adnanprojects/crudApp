import express from 'express';
import { createPost, getPosts, deletePost, updatePost, userPosts } from '../controllers/postsController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getPosts);

router.get('/mypost', auth, userPosts);

router.post('/', auth, createPost);

router.delete('/:id', auth, deletePost);

router.put('/:id', auth, updatePost);

export { router as postsRoutes };