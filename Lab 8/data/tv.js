const { default: axios } = require("axios");

async function getShowsBySearchTerm(showSearchTerm) {
    const { data } = await axios.get(`http://api.tvmaze.com/search/shows?q=${showSearchTerm}`);
    return data;
}

async function getShowById(id) {
    const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    return data;
}

async function getFirstFiveShows(showList) {
    if (showList.length <= 5) {
        return showList;
    }
    let firstFive = [];
    for (let i = 0; i < 5; i++) {
        firstFive.push(showList[i]);
    }
    return firstFive;
}

async function getShowName(show) {
    if (!show['name']) {
        return "N/A";
    } else {
        return show['name'];
    }
}

async function getShowImageLink(show) {
    if (!show['image']) {
        return "https://static.wikia.nocookie.net/to-be-a-power-in-the-shadows/images/6/68/No-image-availablex2.jpg/revision/latest?cb=20220106040708";
    } else {
        return show['image']['medium'];
    }
}

async function getShowLanguage(show) {
    if (!show['language']) {    
        return "N/A";
    } else {
        return show['language'];
    }
}

async function getShowGenres(show) {
    if (!show['genres'][0]) {
        return ["N/A"];
    } else {     
        return show['genres'];
    }
}

async function getShowAvgRating(show) {
    if (!show['rating']['average']) {
        return "N/A";
    } else {
        return show['rating']['average'];
    }
}

async function getShowNetwork(show) {
    if (!show['network']) {
        return "N/A";
    } else {
        return show['network']['name'];
    }
}

async function getShowSummary(show) {
    if (!show['summary']) {
        return "N/A";
    } else {
        return show['summary'];
    }
}

module.exports = {
    getShowsBySearchTerm,
    getShowById,
    getFirstFiveShows,
    getShowName,
    getShowImageLink,
    getShowLanguage,
    getShowGenres,
    getShowAvgRating,
    getShowNetwork,
    getShowSummary
};