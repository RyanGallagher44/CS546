const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const validation = require('../validation');

module.exports = {
    async create(name, genre, website, recordLabel, bandMembers, yearFormed) {
        name = validation.checkString(name, 'name', 'band');
        genre = validation.checkStringArray(genre, 'genre', 'band', 1);
        website = validation.checkString(website, 'website', 'band');
        website = validation.isValidWebsite(website);
        recordLabel = validation.checkString(recordLabel, 'record label', 'band');
        bandMembers = validation.checkStringArray(bandMembers, 'member', 'band', 1);
        yearFormed = validation.isValidYear(yearFormed);

        const bandCollection = await bands();

        let newBand = {
            name: name,
            genre: genre,
            website: website,
            recordLabel: recordLabel,
            bandMembers: bandMembers,
            yearFormed: yearFormed,
            albums: [],
            overallRating: 0
        };

        const insertInfo = await bandCollection.insertOne(newBand);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw "Could not create band";

        const newId = insertInfo.insertedId.toString();
        const band = await this.get(newId);

        band._id = band._id.toString();

        return band;
    },

    async getAll() {
        const bandCollection = await bands();

        const bandList = await bandCollection.find({}, { projection: { _id: 1, name: 1 } }).toArray();
        if (!bandList) throw "Could not get all bands";

        bandList.forEach((band) => {
            band._id = band._id.toString();
        });

        return bandList;
    },

    async get(id) {
        id = validation.checkId(id);

        const bandCollection = await bands();

        const band = await bandCollection.findOne({ _id: ObjectId(id) });
        if (band === null) throw `NOT FOUND - There is no band with the ID of ${id}`;

        band._id = band._id.toString();

        return band;
    },

    async remove(id) {
        id = validation.checkId(id);
    
        const band = await this.get(id);

        const bandCollection = await bands();

        const deleteInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });
        if (deleteInfo.deletecCount === 0) throw `Could not delete band with the ID of ${id}`;

        return {bandId: id, deleted: true};
    },

    async update(id, name, genre, website, recordLabel, bandMembers, yearFormed) {
        id = validation.checkId(id);
        name = validation.checkString(name, 'name', 'band');
        genre = validation.checkStringArray(genre, 'genre', 'band', 1);
        website = validation.checkString(website, 'website', 'band');
        website = validation.isValidWebsite(website);
        recordLabel = validation.checkString(recordLabel, 'record label', 'band');
        bandMembers = validation.checkStringArray(bandMembers, 'member', 'band', 1);
        yearFormed = validation.isValidYear(yearFormed);

        const bandCollection = await bands();

        const band = await this.get(id);

        const updatedBand = {
            name: name,
            genre: genre,
            website: website,
            recordLabel: recordLabel,
            bandMembers: bandMembers,
            yearFormed: yearFormed,
            albums: band.albums,
            overallRating: band.overallRating
        };

        const updateInfo = await bandCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedBand });
        if (updateInfo.modifiedCount === 0) throw `Could not update band with the ID of ${id}`;

        const band2 = await this.get(id);

        band2._id = band2._id.toString();

        return band2;
    }
}