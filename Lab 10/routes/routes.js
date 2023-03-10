const express = require('express');
const router = express.Router();
const data = require('../data');
const { checkUser } = require('../data/users');
const userData = data.users;
const validation = require('../validation');

router.get('/', async (req, res) => {
    if (req.session.user) {
        res.redirect('/private');
    } else {
        res.render('partials/login', {title: 'Login', header: 'Login'});
    }
});

router.get('/signup', async (req, res) => {
    if (req.session.user) {
        res.redirect('/private');
    } else {
        res.render('partials/signup', {title: 'Sign Up', header: 'Sign Up'});
    }
});

router.post('/signup', async (req, res) => {
    try {
        req.body.username = validation.checkIfUsernameIsValid(req.body.username);
        req.body.password = validation.checkIfPasswordIsValid(req.body.password);
    } catch (e) {
        return res.status(400).render('partials/signup', {title: 'Sign Up', header: 'Sign Up', error: e});
    }

    try {
        let createUserRes = await userData.createUser(req.body.username, req.body.password);
        if (createUserRes.userInserted == true) {
            res.redirect('/');
        }
    } catch (e) {
        return res.status(400).render('partials/signup', {title: 'Sign Up', header: 'Sign Up', error: e});
    }

    res.status(500).render('partials/private', {title: '500', header: '500', error: 'Internal Server Error'});
});

router.post('/login', async (req, res) => {
    try {
        req.body.username = validation.checkIfUsernameIsValid(req.body.username);
        req.body.password = validation.checkIfPasswordIsValid(req.body.password);
    } catch (e) {
        return res.status(400).render('partials/login', {title: 'Login', header: 'Login', error: e});
    }

    try {
        let checkUserRes = await userData.checkUser(req.body.username, req.body.password);
        if (checkUserRes.userAuthenticated == true) {
            req.session.user = {username: req.body.username};
            res.redirect('/private');
        }
    } catch (e) {
        res.status(400).render('partials/login', {title: 'Login', header: 'Login', error: e});
    }
});

router.get('/private', async (req, res) => {
    if (req.session.user) {
        res.render('partials/private', {title: 'Private', header: req.session.user.username});
    }
});

router.get('/logout', async (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.render('partials/logout', {title: 'Logout', header: 'Logout'})
    } else {
        res.status(403).render('partials/logout', {title: '403', header: '403', error: 'User is not logged in'});
    }
});

module.exports = router;