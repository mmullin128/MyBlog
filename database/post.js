import mongoose from 'mongoose';
import path from 'path';
import Post from './models/post.js'
import BlogStat from './models/blogstat.js'
import fs, { readFileSync } from 'fs';

const CONNECTION_URL = "mongodb+srv://mmullin:xrca2blk-33wx@cluster0.rwcce.mongodb.net/cluster0?retryWrites=true&w=majority"


function readFile(fileName) {
    try {
        return fs.readFileSync(fileName, 'utf8');
    } catch(e) {
        console.log('error', e.stack);
    }
}


async function post() {
    await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('connected to database');
        })
        .catch((err) => console.log(err.message));
    const data = readFile('post/postBody.html');
    const metaText = readFileSync('post/postMeta.json');
    const metaJson = JSON.parse(metaText);
    const postsNumQuery =  BlogStat.findOne({stat: "postsNum"});
    const postsNumDoc = await postsNumQuery.exec();
    let postsNum = postsNumDoc.value;
    postsNum += 1
    const post = await Post.create({...metaJson, content: data, postNum: postsNum});
    postsNumDoc.value = postsNum;
    await postsNumDoc.save()
    console.log('new post: ', postsNumDoc.value)
    mongoose.connection.close()
}

post()