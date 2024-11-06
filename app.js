require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');

const connectDB = require('./server/config/db')

const flash = require('connect-flash');
const session = require('express-session');

const app = express();
const port = 5000 || process.env.PORT;

//connect to database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//static files
app.use(express.static('public'));


// Express Session
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        }
    })
);

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));

//template engine
app.use(expressLayout);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/customer'))

app.get('*', (req, res) => {
    res.status(404).render('404')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})




