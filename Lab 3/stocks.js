const { default: axios } = require("axios");
const people = require('./people');

async function getStocks() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data;
}

async function listShareholders(stockName) {
    if (!stockName) throw "You must provide a stock name";
    if (typeof stockName != 'string') throw "Stock name must be a string";
    if (stockName.trim().length === 0) throw "Stock name cannot be just empty spaces";
    let shareHolders = [];
    let stockFound = false;
    (await getStocks()).forEach((object) => {
        if (object["stock_name"] == stockName) {
            stockFound = true;
            object["shareholders"].forEach((user) => {
                shareHolders.push(user);
            });
        }
    });
    for (let i = 0; i < shareHolders.length; i++) {
        let userId = shareHolders[i]["userId"];
        let noOfShares = shareHolders[i]["number_of_shares"];
        shareHolders[i] = { first_name: "", last_name: "", number_of_shares: "" };
        shareHolders[i]["first_name"] = (await people.getPersonById(userId))["first_name"];
        shareHolders[i]["last_name"] = (await people.getPersonById(userId))["last_name"];
        shareHolders[i]["number_of_shares"] = noOfShares;
    }
    let retObj = {};
    (await getStocks()).forEach((object) => {
        if (object["stock_name"] == stockName) {
            object["shareholders"] = shareHolders;
            retObj = object;
        }
    });
    if (!stockFound) throw "Stock not found";
    return retObj;
}

async function totalShares(stockName) {
    if (!stockName) throw "You must provide a stock name";
    if (typeof stockName != 'string') throw "Stock name must be a string";
    if (stockName.trim().length === 0) throw "Stock name cannot be just empty spaces";
    let numShareholders = 0;
    let totalShares = 0;
    let stockFound = false;
    (await getStocks()).forEach((object) => {
        if (object["stock_name"] == stockName) {
            stockFound = true;
            object["shareholders"].forEach((user) => {
                totalShares += user["number_of_shares"];
                numShareholders++;
            });
        }
    });
    if (!stockFound) throw "Stock not found";
    if (numShareholders === 0) {
        return `${stockName} currently has no shareholders.`;
    }
    if (numShareholders === 1) {
        if (totalShares == 1) {
            return `${stockName}, has ${numShareholders} shareholder that owns a total of ${totalShares} share.`;
        } else {
            return `${stockName}, has ${numShareholders} shareholder that owns a total of ${totalShares} shares.`;
        }
    }
    return `${stockName}, has ${numShareholders} shareholders that own a total of ${totalShares} shares.`;
}

async function listStocks(firstName, lastName) {
    if (!firstName) throw "You must provide a first name";
    if (!lastName) throw "You must provide a last name";
    if (typeof firstName != 'string') throw "First name must be a string";
    if (typeof lastName != 'string') throw "Last name must be a string";
    firstName = firstName.trim();
    lastName = lastName.trim();
    if (firstName.length === 0) throw "First name cannot be just empty spaces";
    if (lastName.length === 0) throw "Last name cannot be just empty spaces";
    let userId = "";
    let userStocksOwned = [];
    let personFound = false;
    (await people.getPeople()).forEach((object) => {
        if (object["first_name"] === firstName && object["last_name"] === lastName) {
            personFound = true;
            userId = object["id"];
        }
    });
    (await getStocks()).forEach((object) => {
        object["shareholders"].forEach((user) => {
            if (user["userId"] === userId) {
                userStocksOwned.push({stock_name: object["stock_name"], number_of_shares: user["number_of_shares"]});
            }
        });
    });
    if (!personFound) throw "Person not found";
    if (userStocksOwned.length === 0) throw `${firstName} ${lastName} does not own any shares in any company`;
    return userStocksOwned;
}

async function getStockById(id) {
    if (!id) throw "ID does not exist";
    if (typeof id != "string") throw "ID must be a string";
    id = id.trim();
    if (id.length === 0) throw "ID cannot just be empty spaces";
    let stockFound = {};
    (await getStocks()).forEach((object) => {
        if (object["id"] === id) {
            stockFound = object;
        }
    });
    if (Object.keys(stockFound).length === 0) throw "Stock not found";
    return stockFound;
}

module.exports = {
    listShareholders,
    totalShares,
    listStocks,
    getStockById
}