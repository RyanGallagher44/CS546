const express = require('express');
const router = express.Router();
const data = require('../data');
const bandData = data.bands;
const validation = require('../validation');

router.get('/', async (req, res) => {
    try {
        let bandList = await bandData.getAll();
        res.json(bandList);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get('/:id', async (req, res) => {
    try {
        req.params.id = validation.checkId(req.params.id);
    } catch (e) {
        return res.status(400).json({ error: e });
    }
    
    try {
        let band = await bandData.get(req.params.id);
        res.json(band);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    let bandInfo = req.body;

    try {
        bandInfo.name = validation.checkString(bandInfo.name, 'name');
        bandInfo.genre = validation.checkStringArray(bandInfo.genre, 'genre');
        bandInfo.website = validation.checkString(bandInfo.website, 'website');
        bandInfo.website = validation.isValidWebsite(bandInfo.website);
        bandInfo.recordLabel = validation.checkString(bandInfo.recordLabel, 'record label');
        bandInfo.bandMembers = validation.checkStringArray(bandInfo.bandMembers, 'member');
        bandInfo.yearFormed = validation.isValidYear(bandInfo.yearFormed);
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        const newBand = await bandData.create(
            bandInfo.name,
            bandInfo.genre,
            bandInfo.website,
            bandInfo.recordLabel,
            bandInfo.bandMembers,
            bandInfo.yearFormed
        );
        res.json(newBand);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.put('/:id', async (req, res) => {
    let bandInfo = req.body;

    try {
        req.params.id = validation.checkId(req.params.id);
        bandInfo.name = validation.checkString(bandInfo.name, 'name');
        bandInfo.genre = validation.checkStringArray(bandInfo.genre, 'genre');
        bandInfo.website = validation.checkString(bandInfo.website, 'website');
        bandInfo.website = validation.isValidWebsite(bandInfo.website);
        bandInfo.recordLabel = validation.checkString(bandInfo.recordLabel, 'record label');
        bandInfo.bandMembers = validation.checkStringArray(bandInfo.bandMembers, 'member');
        bandInfo.yearFormed = validation.isValidYear(bandInfo.yearFormed);
    } catch (e) {
        return res.status(400).json({ error: e });
    }

    try {
        await bandData.get(req.params.id);
    } catch (e) {
        return res.status(404).json({ error: e });
    }

    try {
        const updatedBand = await bandData.update(
            req.params.id,
            bandInfo.name,
            bandInfo.genre,
            bandInfo.website,
            bandInfo.recordLabel,
            bandInfo.bandMembers,
            bandInfo.yearFormed
        );
        res.json(updatedBand);
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
        await bandData.get(req.params.id);
    } catch (e) {
        return res.status(404).json({ error: e });
    }
    
    try {
        let removedBand = await bandData.remove(req.params.id);
        res.json(removedBand);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;