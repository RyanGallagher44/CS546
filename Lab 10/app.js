const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const expbhs = require('express-handlebars');

const session = require('express-session');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', expbhs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}));

app.use('/private', (req, res, next) => {
    if (!req.session.user) {
        res.status(403).render('partials/private', {title: '403', header: '403', error: 'User is not logged in'});
    } else {
        next();
    }
});

app.use(async (req, res, next) => {
    let auth = "(Non-Authenticated User)";
    if (req.session.user) { auth = "(Authenticated User)" };
    console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} ${auth}`);
    next();
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});