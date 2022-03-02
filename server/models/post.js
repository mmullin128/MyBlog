import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    tags: [String],
    images: [{filename: String, data: String}],
    date: { type: Date, default: Date.now },
    content: String
});

const Post = mongoose.model('Post', postSchema);

export default Post