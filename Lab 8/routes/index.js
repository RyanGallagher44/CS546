const routes = require('./tv');

const constructorMethod = (app) => {
    app.use('/', routes);

    app.use('*', (req, res) => {
        res.status(404).render('finder/single', {title: "Error", error: "That route cannot be accessed."});
    });
};

module.exports = constructorMethod;