import express from 'express';
import { getAllPosts, getRecentPosts, getPost, createPost } from '../controllers/posts.js'

const router = express.Router();

router.get('/', getAllPosts);
router.get('/recents', getRecentPosts);
router.get('/:postId', getPost);
router.post('/', createPost);

export default router