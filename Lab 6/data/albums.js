const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const validation = require('../validation');

module.exports = {
    async create(bandId, title, releaseDate, tracks, rating) {
        bandId = validation.checkId(bandId);
        title = validation.checkString(title, 'title', 'album');
        releaseDate = validation.isValidDate(releaseDate);
        tracks = validation.checkStringArray(tracks, 'track', 'album', 3);
        rating = validation.isValidRating(rating);

        const bandCollection = await bands();

        let newAlbum = {
            _id: ObjectId(),
            title: title,
            releaseDate: releaseDate,
            tracks,
            rating
        };

        const addAlbum = await bandCollection.updateOne({ _id: ObjectId(bandId) }, { $addToSet: { albums: newAlbum } });
        if (addAlbum.modifiedCount === 0) throw `Could not create and add album to the band with the ID of ${bandId}`;

        const updateOverallRating = await bandCollection.updateOne({ _id: ObjectId(bandId) }, [{ $set: { overallRating: { $avg: '$albums.rating' } } }]);
        if (updateOverallRating.modifiedCount === 0) throw `Could not update the overall rating of the band with the ID of ${bandId}`;

        const band = await bandCollection.findOne({ _id: ObjectId(bandId) });
        if (band === null) throw `NOT FOUND - There is no band with the ID of ${id}`;

        return band;
    },

    async getAll(bandId) {
        bandId = validation.checkId(bandId);

        const bandCollection = await bands();

        const albumList = await bandCollection.findOne({ _id: ObjectId(bandId) }, { projection: { _id: 0, albums: 1 } });
        if (!albumList || albumList.albums.length === 0) throw `NOT FOUND - Could not get all albums from the band with the ID of ${bandId}`;

        return albumList.albums;
    },

    async get(albumId) {
        albumId = validation.checkId(albumId);

        const bandCollection = await bands();

        const album = await bandCollection.findOne({ 'albums._id': ObjectId(albumId) }, { projection: { _id: 0, albums: { $elemMatch: { _id: ObjectId(albumId) } } } });
        if (!album) throw `NOT FOUND - There is no album with the ID of ${albumId}`;

        return album.albums[0];
    },

    async remove(albumId) {
        albumId = validation.checkId(albumId);

        const bandCollection = await bands();

        const bandWithAlbum = await bandCollection.findOne({ 'albums._id': ObjectId(albumId) }, { projection: { _id: 1 } });
        if (!bandWithAlbum) throw `NOT FOUND - Could not find album with the ID of ${albumId}`;

        const bandId = bandWithAlbum._id.toString();

        const removeAlbum = await bandCollection.updateOne({ 'albums._id': ObjectId(albumId) }, { $pull: { albums: { _id: ObjectId(albumId) } } });
        if (removeAlbum.modifiedCount === 0) throw `Could not remove the album with the ID of ${albumId} from the band with the ID of ${bandId}`;

        const updateOverallRating = await bandCollection.updateOne({ _id: ObjectId(bandId) }, [{ $set: { overallRating: { $avg: '$albums.rating' } } }]);
        if (updateOverallRating.modifiedCount === 0) throw `Could not update the overall rating of the band with the ID of ${bandId}`;

        return {albumId: albumId, deleted: true};
    }
}