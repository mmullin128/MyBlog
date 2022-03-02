import mongoose from 'mongoose';

const blogStatSchema = new mongoose.Schema({
    stat: String,
    value: Number
});

const BlogStat = mongoose.model('BlogStat', blogStatSchema);

export default BlogStat