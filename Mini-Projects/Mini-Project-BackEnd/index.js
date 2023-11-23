import express from 'express';
import { MongoClient } from 'mongodb';
import methodOverride from 'method-override';
import mongoose from 'mongoose';

const uri = "mongodb://0.0.0.0:27017/";
const app = express();
const port = 3000;
let db;

app.use(methodOverride('override'));
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongoose"))
    .catch(() => console.log("Cannot connect due to this error: "));

const postSchema = new mongoose.Schema({
    name: String,
    description: String,
    likes: Number,
    dislikes: Number,
});

const Posts = mongoose.model('Posts', postSchema);

app.use((req, res, next) => {
    next()
})

app.get('/', (req, res) => {
    timer(2, req, res);
})

app.get('/add', (req, res) => {
    timer(1, req, res);
})

async function timer(params, req, res) {
    let results = await changeRender(params, req, res);
}

const changeRender = async function (params, req, res) {

    try {

        const posts = await Posts.find();
        setTimeout(() => {
            console.log(res);
            if (params == 1) {
                res.render('updateList.ejs');
            }
            else if (params) {
                res.render("shoppingList.ejs", { posts });
            }
            else {
                res.status(404).send("Invalid button clicked");
            }
        }, 1000);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
        res.render('updateList.ejs');
    }
}


app.post('/api/posts/like/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Id is equal to", id);
        const updatedItem = await Posts.findByIdAndUpdate(id, { $inc: { likes: 1 } });
        console.log("New post: ", updatedItem);

        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }

})

app.post('/api/posts/dislike/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Id is equal to", id);
        const updatedItem = await Posts.findByIdAndUpdate(id, { $inc: { dislikes: 1 } });
        console.log("New post: ", updatedItem);

        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }

})

app.post('/api/posts/delete/:id', async (req, res) => {
    const id = req.params.id;

    const removedItem = await Posts.findByIdAndDelete(id);

    res.redirect('/');
})

app.post('/api/add', async (req, res) => {

    console.log(req.body);

    try {

        const { name, description } = req.body;

        const newItem = new Posts({
            name,
            description,
            likes: 0,
            dislikes: 0,
        });

        const result = await newItem.save();
        console.log("Saved to database ", result);
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error saving');
    }

})


app.listen(port, () => {
    console.log(`Its running on port ${port}`);
})
