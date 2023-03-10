const express = require('express');
const router = express.Router();
const data = require('../data');
const bandData = data.bands;
const albumData = data.albums;
const validation = require('../validation');

router.get('/album/:id', async (req, res) => {
    try {
        req.params.id = validation.checkId(req.params.id);
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        let album = await albumData.get(req.params.id);
        res.json(album);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.get('/:id', async (req, res) => {
    try { 
        req.params.id = validation.checkId(req.params.id);
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        await bandData.get(req.params.id);
    } catch (e) {
        return res.status(404).json({ error: e });
    }

    try {
        let albumList = await albumData.getAll(req.params.id);
        res.json(albumList);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/:id', async (req, res) => {
    let albumInfo = req.body;
    
    try {
        req.params.id = validation.checkId(req.params.id);
        albumInfo.title = validation.checkString(albumInfo.title, 'title', 'album');
        albumInfo.releaseDate = validation.isValidDate(albumInfo.releaseDate);
        albumInfo.tracks = validation.checkStringArray(albumInfo.tracks, 'track', 'album', 3);
        albumInfo.rating = validation.isValidRating(albumInfo.rating);
    } catch (e) {
        return res.status(400).json({ error: e });
    }
    
    try {
        await bandData.get(req.params.id);
    } catch (e) {
        return res.status(404).json({ error: e });
    }

    try {
        let band = await albumData.create(
            req.params.id,
            albumInfo.title,
            albumInfo.releaseDate,
            albumInfo.tracks,
            albumInfo.rating
        );
        res.json(band);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        req.params.id = validation.checkId(req.params.id);
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        await albumData.get(req.params.id);
    } catch (e) {
        return res.status(404).json({ error: e });
    }
    
    try {
        let removedAlbum = await albumData.remove(req.params.id);
        res.json(removedAlbum);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;