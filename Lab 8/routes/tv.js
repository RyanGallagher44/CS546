const express = require("express");
const router = express.Router();
const data = require('../data');
const tvData = data.tvData;

router.get('/', async (req, res) => {
    try {
        res.render('finder/index', {title: "Show Finder", header: "Show Finder"});
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/searchshows', async (req, res) => {
    try {
        if (!req.body.showSearchTerm) throw "You must enter a keyword!";
        req.body.showSearchTerm = req.body.showSearchTerm.trim();
        if (req.body.showSearchTerm.length === 0) throw "Your keyword must not be empty!";
    } catch (e) {
        return res.status(400).render('finder/index', {title: "Show Finder", header: "Show Finder", error: e})
    }
    
    try {
        const showList = await tvData.getShowsBySearchTerm(req.body.showSearchTerm);
        const firstFive = await tvData.getFirstFiveShows(showList);
        res.render('finder/shows', {title: "Shows Found", header: "Shows Found", term: req.body.showSearchTerm, shows: firstFive});
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get('/show/:id', async (req, res) => {
    try {
        await tvData.getShowById(req.params.id);
    } catch (e) {
        return res.status(404).render('finder/single', {title: "Error", error: "A show with that ID could not be found."});
    }
    
    try {
        const showFound = await tvData.getShowById(req.params.id);
        let name = await tvData.getShowName(showFound);
        let imageLink = await tvData.getShowImageLink(showFound);
        let lang = await tvData.getShowLanguage(showFound);
        let genres = await tvData.getShowGenres(showFound);
        let avg = await tvData.getShowAvgRating(showFound);
        let net = await tvData.getShowNetwork(showFound);
        let sum = await tvData.getShowSummary(showFound);
        res.render('finder/single', {title: name, name: name, imageLink: imageLink, lang: lang, genres: genres, avg: avg, net: net, sum: sum});
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;