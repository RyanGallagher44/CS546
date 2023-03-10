const express = require("express");
const router = express.Router();
const data = require('../data');
const userApiData = data.userApiData;

router
    .route('/people')
    .get(async (req, res) => {
        try {
            const personList = await userApiData.getPeople();
            res.json(personList);
        } catch (e) {
            res.status(500).json({ error: e });
        }
    });

router
    .route('/work')
    .get(async (req, res) => {
        try {
            const workList = await userApiData.getWork();
            res.json(workList);
        } catch (e) {
            res.status(500).json({ error: e });
        }
    });

router
    .route('/people/:id')
    .get(async (req, res) => {
        try {
            let id = req.params.id;
            if (!id) throw "You must provide an ID";
            id = + id;
            if (isNaN(id)) throw "ID must be a number";
            if (id <= 0) throw "ID must be a positive number";
            if (!Number.isInteger(id)) throw "ID must be a positive whole number";
            const person = await userApiData.getPersonById(id);
            res.json(person);
        } catch (e) {
            res.status(404).json({ error: e });
        }
    });

router
    .route('/work/:id')
    .get(async (req, res) => {
        try {
            let id = req.params.id;
            if (!id) throw "You must provide an ID";
            id = + id;
            if (isNaN(id)) throw "ID must be a number";
            if (id <= 0) throw "ID must be a positive number";
            if (!Number.isInteger(id)) throw "ID must be a positive whole number";
            const work = await userApiData.getWorkById(id);
            res.json(work);
        } catch (e) {
            res.status(404).json({ error: e });
        }
    });

module.exports = router;