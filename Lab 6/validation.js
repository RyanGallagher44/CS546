const { ObjectId } = require('mongodb');

module.exports = {
    checkString(str, varName, obj) {
        if (!str) throw `You must provide the ${obj} ${varName}`;
        if (typeof str != 'string') throw `The ${obj} ${varName} must be a string`;
        str = str.trim();
        if (str.length === 0) throw `The ${obj} ${varName} cannot be an empty string`;

        return str;
    },

    checkStringArray(arr, varName, obj, num) {
        if (!arr) throw `You must provide the ${obj} ${varName}`;
        if (!Array.isArray(arr)) throw `The ${obj} ${varName} must be an array`;
        if (arr.length < num) throw `The ${obj} must have at least ${num} ${varName}`;
        arr.forEach((element, index) => {
            if (typeof element != 'string') throw `Each ${varName} must be a string`;
            arr[index] = element.trim();
            if (arr[index].length === 0) throw `No ${varName} can be an empty string`;
        });

        return arr;
    },

    isValidWebsite(website) {
        const properStartLen = 11;
        const properEndLen = 4;
        if (website.substring(0,properStartLen).toLowerCase() !== 'http://www.') throw "The band website must start with 'http://www.'";
        if (website.substring(website.length-properEndLen).toLowerCase() !== '.com') throw "The band website must end with '.com'";
        let count = 0;
        for (let i = properStartLen; i < website.length-properEndLen; i++) {
            count++;
        }
        if (count < 5) throw "The band's website must have at least 5 characters in-between the 'http://www.' and the '.com'";

        return website;
    },

    isValidYear(year) {
        if (!year) throw "You must provide the year that the band was formed";
        if (typeof year != 'number') throw "The year the band formed must be a number";
        if (!Number.isInteger(year)) throw "The year the band formed must be a whole number";
        if (year < 1900 || year > 2022) throw "The year the band formed must be a whole number in the range 1900-2022";

        return year;
    },

    isValidDate(releaseDate) {
        if (!releaseDate) throw "You must provide the albums's release date";
        if (typeof releaseDate != 'string') throw "The album's release date must be a string";
        releaseDate = releaseDate.trim();
        if (releaseDate.length === 0) throw "The album's release date cannot be an empty string";

        dateArr = releaseDate.split("/");

        if (dateArr.length != 3) throw "The album release date must be a valid date string";
        if (!(dateArr[0].length === 2 && dateArr[1].length === 2 && dateArr[2].length === 4)) throw "The album release date must be a valid date string";
        
        let month = parseInt(dateArr[0]);
        let day = parseInt(dateArr[1]);
        let year = parseInt(dateArr[2]);
        let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
        if (month < 1 || month > 12) throw "The album release date must have a month that is in the range 1-12";
        if (day < 1 || day > daysInMonth[month-1]) throw `The album release date must have a day that is in the range 1-${daysInMonth[month-1]}`;
        let currentYear = new Date().getFullYear();
        if (year < 1900 || year > currentYear+1) throw `The album release date must have a year that is in the range 1900-${currentYear+1}`;

        return releaseDate;
    },

    checkId(id) {
        if (!id) throw "You must provide an ID";
        if (typeof id != 'string') throw "The ID must be a string";
        id = id.trim();
        if (id.length === 0) throw "The ID cannot be an empty string";
        if (!ObjectId.isValid(id)) throw "The ID must be a valid ObjectID";

        return id;
    },

    isValidRating(rating) {
        if (typeof rating != 'number') throw "The album rating must be a number";
        if (rating < 1 || rating > 5) throw "The album rating must be in the range 1-5";

        if (!Number.isInteger(rating)) {
            rating = Math.round(10 * rating)/10;
        }

        return rating;
    }
}