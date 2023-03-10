const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');

module.exports = {
    async create(name, genre, website, recordLabel, bandMembers, yearFormed) {
        // checking for existence of all arguments
        if (!name) throw "You must provide the band name";
        if (!genre) throw "You must provide the band's genre";
        if (!website) throw "You must provide the band's website";
        if (!recordLabel) throw "You must provide the band's record label";
        if (!bandMembers) throw "You must provide the band's members";
        if (!yearFormed) throw "You must provide the year that the band was formed";

        // checking if name, website, and recordLabel are all strings and not empty strings
        if (typeof name != 'string') throw "The band name must be a string";
        name = name.trim();
        if (name.length === 0) throw "The band name cannot be an empty string";
        if (typeof website != 'string') throw "The band's website must be a string";
        website = website.trim();
        if (website.length === 0) throw "The band's website cannot be an empty string";
        if (typeof recordLabel != 'string') throw "The band's record label must be a string";
        recordLabel = recordLabel.trim();
        if (recordLabel.length === 0) throw "The band's record label cannot be an empty string";
        
        // checking if genre is an array with a length of at least one, where all elements are valid strings
        if (!Array.isArray(genre)) throw "The band's genre(s) must be an array";
        if (genre.length < 1) throw "The band must have at least one genre";
        genre.forEach((element, index) => {
            if (typeof element != 'string') throw "Each genre must be a string";
            genre[index] = element.trim();
            if (genre[index].length === 0) throw "No genre can be an empty string";
        });

        // checking if website starts with 'http://www.' and ends with '.com', with at least 5 characters in-between
        const properStartLen = 11;
        const properEndLen = 4;
        if (website.substring(0,properStartLen).toLowerCase() !== 'http://www.') throw "The band's website must start with 'http://www.'";
        if (website.substring(website.length-properEndLen).toLowerCase() !== '.com') throw "The band's website must end with '.com'";
        let count = 0;
        for (let i = properStartLen; i < website.length-properEndLen; i++) {
            count++;
        }
        if (count < 5) throw "The band's website must have at least 5 characters in-between the 'http://www.' and the '.com'";

        // checking if bandMembers is an array with a length of at least one, where all elements are valid strings
        if (!Array.isArray(bandMembers)) throw "The band's member(s) must be an array";
        if (bandMembers.length < 1) throw "The band must have at least one member";
        bandMembers.forEach((element, index) => {
            if (typeof element != 'string') throw "Each member must be a string";
            bandMembers[index] = element.trim();
            if (bandMembers[index].length === 0) throw "No member can be an empty string";
        });

        // checking if yearFormed is a whole number and is between 1900-2022
        if (typeof yearFormed != 'number') throw "The year the band formed must be a number";
        if (!Number.isInteger(yearFormed)) throw "The year the band formed must be a whole number";
        if (yearFormed < 1900 || yearFormed > 2022) throw "The year the band formed must be a whole number in the range 1900-2022";

        const bandCollection = await bands();
        
        let newBand = {
            name: name,
            genre: genre,
            website: website,
            recordLabel: recordLabel,
            bandMembers: bandMembers,
            yearFormed: yearFormed
        };

        const insertInfo = await bandCollection.insertOne(newBand);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw "Could not add band";

        const newId = insertInfo.insertedId.toString();
        const band = await this.get(newId);

        band._id = band._id.toString();

        return band;
    },

    async getAll() {
        const bandCollection = await bands();

        const bandList = await bandCollection.find({}).toArray();
        if (!bandList) throw "Could not get all bands";

        bandList.forEach((band) => {
            band._id = band._id.toString();
        });

        return bandList;
    },

    async get(id) {
        if (!id) throw "You must provide an ID";
        if (typeof id != 'string') throw "The ID must be a string";
        id = id.trim();
        if (id.length === 0) throw "The ID cannot be an empty string";
        if (!ObjectId.isValid(id)) throw "The ID must be a valid ObjectID";

        const bandCollection = await bands();

        const band = await bandCollection.findOne({ _id: ObjectId(id) });
        if (band === null) throw `There is no band with the ID of ${id}`;

        band._id = band._id.toString();

        return band;
    },

    async remove(id) {
        if (!id) throw "You must provide an ID";
        if (typeof id != 'string') throw "The ID must be a string";
        id = id.trim();
        if (id.length === 0) throw "The ID cannot be an empty string";
        if (!ObjectId.isValid(id)) throw "The ID must be a valid ObjectID";

        const band = await this.get(id);

        const bandCollection = await bands();

        const deleteInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });
        if (deleteInfo.deletedCount === 0) throw `Could not delete band with the ID of ${id}`;

        return `${band.name} has been successfully deleted!`;
    },
    
    async rename(id, newName) {
        if (!id) throw "You must provide an ID";
        if (!newName) throw "You must provide a new name";
        if (typeof id != 'string') throw "The ID must be a string";
        id = id.trim();
        if (typeof newName != 'string') throw "The new name must be a string";
        newName = newName.trim();
        if (id.length === 0) throw "The ID cannot be an empty string";
        if (newName.length === 0) throw "The new name cannot be an empty string";
        if (!ObjectId.isValid(id)) throw "The ID must be a valid ObjectID";
        
        const bandCollection = await bands();

        const band = await this.get(id);

        if (newName === band.name) throw "The new name cannot be the same as the current name";

        const renamedBand = {
            name: newName,
            genre: band.genre,
            website: band.website,
            recordLabel: band.recordLabel,
            bandMembers: band.bandMembers,
            yearFormed: band.yearFormed
        };

        const updateInfo = await bandCollection.updateOne({ _id: ObjectId(id) }, { $set: renamedBand });
        if (updateInfo.modifiedCount === 0) throw `Could not rename band with the ID of ${id}`;

        const band2 = await this.get(id);

        band2._id = band2._id.toString();

        return band2;
    }
}