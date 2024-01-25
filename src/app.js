// Require
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const session = require("express-session");
const cookieParser = require("cookie-parser");

// Routes require
const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productRoutes = require('./routes/productRoutes');

// Express
const app = express();

// Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
     secret: "3DWorld", 
     resave: false,
    saveUninitialized: false
    }));
app.use(cookieParser());

app.use('/', mainRoutes);
app.use('/user', usersRoutes);
app.use('/product', productRoutes);

app.use((req, res, next) => {
    res.status(404).render('not-found');
});

const port = 3017;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});