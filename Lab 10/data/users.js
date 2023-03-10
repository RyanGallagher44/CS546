const { compare } = require('bcrypt');
const bcrypt = require('bcrypt');
const saltRounds = 16;
const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const validation = require('../validation');

module.exports = {
    async createUser(username, password) {
        username = validation.checkIfUsernameIsValid(username);

        const userCollection = await users();
        const user = await userCollection.findOne({username: username});
        if (user !== null) throw "This username already exists";

        password = validation.checkIfPasswordIsValid(password);

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let newUser = {
            username: username,
            password: hashedPassword
        };

        const insertInfo = await userCollection.insertOne(newUser);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw "Could not create user";

        return {userInserted: true};
    },

    async checkUser(username, password) {
        username = validation.checkIfUsernameIsValid(username);
        password = validation.checkIfPasswordIsValid(password);

        const userCollection = await users();

        const user = await userCollection.findOne({username: username});
        if (user === null) throw "Either the username or password is invalid";

        const hashedPassword = await userCollection.findOne({username: username}, {projection: {_id: 0, username: 0}});

        const hashedPassword2 = hashedPassword.password;

        let compareToMatch = false;

        try {
            compareToMatch = await bcrypt.compare(password, hashedPassword2);
        } catch (e) {

        }

        if (!compareToMatch) throw "Either the username or password is invalid";

        return {userAuthenticated: true};
    }
}