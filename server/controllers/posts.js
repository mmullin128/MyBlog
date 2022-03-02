import Post from '../models/post.js'
import BlogStat from '../models/blogStat.js'


export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};





export const getRecentPosts = async (req , res) => {
    console.log('getting recent posts')
    try {
        const query = BlogStat.findOne({stat: "postsNum"});
        const doc = await query.exec();
        console.log(doc)
        const postNum = doc.value;
        console.log(postNum);
        const earliestPostNum = postNum - 5;
        const postsQuery = Post.find({postNum: { $gte: earliestPostNum }});
        const posts = await postsQuery.exec();
        console.log('posts: ', posts)
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



export const getPost = (req, res) => {
    res.send(`looking for post: ${req.params["postId"]}`);
};
export const createPost = ( req, res ) => {
    res.send('poop');
}