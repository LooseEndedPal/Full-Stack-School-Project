import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import 'dotenv/config';


const uri = process.env.DATABASE;
const app = express();
const port = 3001;

console.log(process.env.secret);
console.log(process.env.DATABASE);

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



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongoose"))
    .catch(() => console.log("Cannot connect due to this error: "));


passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await User.findOne({ username: username });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, user);
    }
));

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

app.use((req, res, next) => {
    next()
})

app.get('/', async (req, res) => {
    const posts = await Posts.find();
    res.render("postList.ejs", { posts });
})

app.get('/add', (req, res) => {
    res.render('updateList.ejs');
})

app.get('/api/check', async(req, res) =>{
    const posts = await Posts.find();
    console.log("It works");
    res.json(posts);
})

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

const changeRender = async function (params, req, res) {

    try {

        const posts = await Posts.find();
        setTimeout(() => {
            console.log(res);
            if (params == 1) {
                res.render('updateList.ejs');
            }
            else if (params == 2) {
                res.render("postList.ejs", { posts });
            }
            else if(params == 3){
                res.render('register.ejs');
            }
            else if(params == 4){
                res.render('login.ejs');
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

app.listen(port, () => {
    console.log(`Its running on port ${port}`);
})
