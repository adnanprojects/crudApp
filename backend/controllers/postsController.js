import Post from "../models/PostSchema.js";
import mongoose from "mongoose";
import User from "../models/UserSchema.js";

const getPosts = async (request, response) => {
    try {
        const posts = await Post.find();
        response.status(200).json({ posts });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

const userPosts = async (request, response) => {
    try {
        const posts = await Post.find({ userId: request.user.id });
        response.status(200).json({ posts, email: request.user.email });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

const createPost = async (request, response) => {
    const { title, body } = request.body;
    if (!title || !body) return response.status(400).json({ error: 'All fields are mandatory' });

    const user = await User.findById(request.user.id);
    try {
        const post = await Post.create({ userId: user._id, title, body });
        response.status(200).json({ message: 'Post created!', post });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

const deletePost = async (request, response) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return response.status(400).json({ error: 'Id is not correct' });
    const post = await Post.findById(id);
    if (!post)
        return response.status(400).json({ error: 'Post is not available' });

    // const user = await User.findById(request.user._id);
    // if (!post.user.equals(user))
    //     return response.status(401).json({ error: 'Not authorized' });

    try {
        await post.deleteOne();
        response.status(200).json({ message: 'Post was deleted!' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

const updatePost = async (request, response) => {
    const { title, body } = request.body;
    const { id } = request.params;

    if (!title || !body)
        return response.status(400).json({ error: 'All fields are mandatory' });

    const post = await Post.findById(id);
    if (!post)
        return response.status(400).json({ error: 'Post is not available' });

    const user = await User.findById(request.user.id);
    if (!post.user.equals(user))
        return response.status(401).json({ error: 'Not authorized' });

    try {
        await post.updateOne({ title, body });
        response.status(200).json({ message: 'Post was updated' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export { getPosts, userPosts, createPost, deletePost, updatePost };