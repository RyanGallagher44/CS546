const { default: axios } = require("axios");

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    return data;
}

async function getWork() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    return data;
}

async function getPersonById(id) {
    if (!id) throw "You must provide an ID";
    id = + id;
    if (isNaN(id)) throw "ID must be a number";
    if (id <= 0) throw "ID must be a positive number";
    if (!Number.isInteger(id)) throw "ID must be a positive whole number";
    let personFound = {};
    (await getPeople()).forEach((object) => {
        if (object["id"] === id) {
            personFound = object;
        }
    });
    if (Object.keys(personFound).length === 0) throw "Person not found";
    return personFound;
}

async function getWorkById(id) {
    if (!id) throw "You must provide an ID";
    id = + id;
    if (isNaN(id)) throw "ID must be a number";
    if (id <= 0) throw "ID must be a positive number";
    if (!Number.isInteger(id)) throw "ID must be a positive whole number";
    let workFound = {};
    (await getWork()).forEach((object) => {
        if (object["id"] == id) {
            workFound = object;
        }
    });
    if (Object.keys(workFound).length === 0) throw "Work not found";
    return workFound;
}

module.exports = {
    getPeople,
    getWork,
    getPersonById,
    getWorkById
};