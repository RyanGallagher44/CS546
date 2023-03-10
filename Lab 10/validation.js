module.exports = {
    checkIfUsernameIsValid(username) {
        if (!username) throw "You must enter a username";
        if (typeof username != 'string') throw "Username must be a string";
        username = username.trim();
        if (username.length === 0) throw "Username cannot be just empty space";
        if (username.length < 4) throw "Username must be at least 4 characters long";
        for (let i = 0; i < username.length; i++) {
        if (!(username[i].charCodeAt(0) >= 48 && username[i].charCodeAt(0) <= 57) &&
            !(username[i].charCodeAt(0) >= 65 && username[i].charCodeAt(0) <= 90) &&
            !(username[i].charCodeAt(0) >= 97 && username[i].charCodeAt(0) <= 122)) {
                throw "Username can only contain alphanumeric characters [0-9, A-Z, a-z]";
            }
        }

        username = username.toLowerCase();

        return username;
    },

    checkIfPasswordIsValid(password) {
        if (!password) throw "You must enter a password";
        if (typeof password != 'string') throw "Password must be a string";
        if (password.length < 6) throw "Password must be at least 6 characters long";
        if (password.indexOf(' ') != -1) throw "Password cannot contain any spaces";

        return password;
    }
}