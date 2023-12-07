//Imports
import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import 'dotenv/config';
import cors from 'cors';

//Constant Variables
const uri = process.env.DATABASE;
const app = express();
const port = 3001;

//Use Statements
app.use(cors());
app.use(methodOverride('override'));
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//Database and Passport Initializations
mongoose.connect(uri).then(() => console.log("It connected")).catch(err =>console.log(err));


passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await User.findOne({ username: username });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, user);
    }
));

//Passport serializations and deserializations
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

//Database Schemas
const postSchema = new mongoose.Schema({
    name: String,
    description: String,
    likes: Number,
    dislikes: Number,
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);
const Posts = mongoose.model('Posts', postSchema);


//Middleware
app.use((req, res, next) => {
    next()
})

//Get requests
app.get('/api/getList', async (req, res) => {
    const posts = await Posts.find();
    console.log("Ping");
    res.json(posts);
})


app.get('/api/getUser', (req, res) => {
    res.json({ user: req.user })
})


//Database
app.get('/api/posts/like/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Id is equal to", id);
        const updatedItem = await Posts.findByIdAndUpdate(id, { $inc: { likes: 1 } });
        console.log("New post: ", updatedItem);
        res.status(200)
    }
    catch (err) {
        console.log(err);
    }

})

app.get('/api/posts/dislike/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Id is equal to", id);
        const updatedItem = await Posts.findByIdAndUpdate(id, { $inc: { dislikes: 1 } });
        console.log("New post: ", updatedItem);

        res.status(200);
    }
    catch (err) {
        console.log(err);
    }

})

app.get('/api/posts/delete/:id', async (req, res) => {
    const id = req.params.id;

    const removedItem = await Posts.findByIdAndDelete(id);

    res.status(200);
})

app.post('/api/add', async (req, res) => {

    console.log(req.body);

    try{

        const { name, description } = req.body;
        console.log(name);
        console.log(description);

        const newItem = new Posts({
            name,
            description,
            likes: 0,
            dislikes: 0,
        });

        console.log(newItem);

        const result = await newItem.save();
        console.log("Saved to database ", result);
        res.status(200).redirect('/');
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error saving');
    }

})

//Passport post requests
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({ username: req.body.username, password: hashedPassword });
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.redirect('/register');
    }
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

//Listening
app.listen(port, () => {
    console.log(`Its running on port ${port}`);
})
