const userRoutes = require('./routes');

const constructorMethod = (app) => {
    app.use('/', userRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: "Route not found" });
    });
};

module.exports = constructorMethod;