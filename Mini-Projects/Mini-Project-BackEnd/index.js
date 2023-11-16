import express from 'express';
import { MongoClient } from 'mongodb';
import methodOverride from 'method-override'

const uri = "mongodb://0.0.0.0:27017/";
const app = express();
const port = 3000;
let db;

app.use(methodOverride('override'));
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

const shoppingList = [
    { id: 1, name: 'Pasta', quantity: 1 },
    { id: 2, name: 'Apples', quantity: 1 },
    { id: 3, name: 'Crab', quantity: 1 },
    { id: 4, name: 'Orange Juice', quantity: 1 },
];

(async function () {
    console.log("It happened");
    try {
        console.log("I happened");
        const client = await MongoClient.connect(uri);
        console.log('Connected to MongoDB.');
        db = client.db("fitnessTracker");

    } catch (err) {
        console.error('Error occurred while connecting to MongoDB:', err);
    }
})();

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
    let results = await lol(params, req, res);
}

const lol = async function (params, req, res) {

    try {

        const collection = db.collection('posts');
        const posts = await collection.find({}).toArray();
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


app.post('/api/shoppingList/increaseQuantity/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = shoppingList.findIndex(x => x.id === id);

    shoppingList[index].quantity += 1;

    res.redirect('/')

})

app.post('/api/shoppingList/decreaseQuantity/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = shoppingList.findIndex(x => x.id === id);

    posts.likes -= 1;

    if (shoppingList[index].quantity <= 0) {

        if (index !== -1) {
            shoppingList.splice(index, 1);
            res.redirect('/');
        }
        else {
            res.status(404).send(`${itemId} not found.`)
        }
    }

    res.redirect('/')

})

app.post('/api/posts/delete/:id', (req, res) => {

    const itemId = parseInt(req.params.id);
    //const index = shoppingList.findIndex(x => x.id === itemId);
    const collection = db.collection('posts');
    console.log(req.params.id);
    res.redirect('/');
    //const collection = db.collection('posts');
    //console.log("I happened");
    //collection.remove()

    /*if (index !== -1) {
        shoppingList.splice(index, 1);
        res.redirect('/');
    }
    else {
        res.status(404).send(`${itemId} not found.`)
    }*/
})

app.post('/api/add', (req, res) => {

    console.log(req.body.name);

    const newItem = {
        name: req.body.name,
        likes: 0,
        dislike: 0,
    };

    const collection = db.collection('posts');
    collection.insertOne(newItem, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error posting");
            return;
        }
        console.log("Post uploaded")
    })
    res.redirect('/');
})


app.listen(port, () => {
    console.log(`Its running on port ${port}`);
})
