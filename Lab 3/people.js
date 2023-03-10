const { default: axios } = require("axios");

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data; // this will be the array of people objects
}

async function getPersonById(id) {
    if (!id) throw "You must provide an ID";
    if (typeof id != "string") throw "ID must be a string";
    id = id.trim();
    if (id.length === 0) throw "ID cannot just be empty spaces";
    let personFound = {};
    (await getPeople()).forEach((object) => {
        if (object["id"] === id) {
            personFound = object;
        }
    });
    if (Object.keys(personFound).length === 0) throw "Person not found";
    return personFound;
}

async function sameEmail(emailDomain) {
    if (!emailDomain) throw "You must provide an email domain";
    if (typeof emailDomain != "string") throw "Email domain must be a string";
    emailDomain = emailDomain.trim();
    if (emailDomain.length === 0) throw "Email domain cannot just be empty spaces";
    if (emailDomain.indexOf('.') === -1) throw "Email domain must contain a dot";
    let splitDomain = emailDomain.split('.');
    let splitDomain2 = splitDomain[splitDomain.length-1].split("");
    let letterCount = 0;
    for (let i = 0; i < splitDomain2.length; i++) {
        splitDomain2[i] = Number(splitDomain2[i]);
        if (isNaN(splitDomain2[i])) {
            letterCount++;
        }
    }
    if (letterCount < 2) throw "Email domain must have at least 2 letters after the dot";
    let peopleWithSameEmails = [];
    (await getPeople()).forEach((object) => {
        let emailArr = object["email"].split("@");
        if (emailArr[1].toLowerCase() === emailDomain.toLowerCase()) {
            peopleWithSameEmails.push(object);
        }
    });
    if (peopleWithSameEmails.length < 2) throw `There does not exist 2 or more people that have ${emailDomain} as their email domain`;
    return peopleWithSameEmails;
}

async function manipulateIp() {
    let numIPs = 0;
    let sumIPs = 0;
    let lowIP = Number.MAX_VALUE;
    let hiIP = Number.MIN_VALUE;
    let retObj = {highest: "", lowest: "", average: ""};
    (await getPeople()).forEach((object) => {
        let arrIP = [];
        let splitIP = object["ip_address"].split("");
        splitIP.forEach((element) => {
            if (element != '.') {
                arrIP.push(element);
            }
        });
        arrIP.sort();
        
        let strIP = "";
        arrIP.forEach((element) => {
            strIP += element;
        });
        numIPs++;
        sumIPs += Number(strIP);

        if (Number(strIP) < lowIP) { 
            retObj["lowest"] = {firstName: object["first_name"], lastName: object["last_name"]};
            lowIP = Number(strIP);
        }
        if (Number(strIP) > hiIP) {
            retObj["highest"] = {firstName: object["first_name"], lastName: object["last_name"]};
            hiIP = Number(strIP);
        }
    });
    retObj["average"] = Math.floor(sumIPs/numIPs);
    return retObj;
}

async function sameBirthday(month, day) {
    let daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    if (!month) throw "You must provide a month";
    if (!day) throw "You must provide a day";
    month = Number(month);
    day = Number(day);
    if (isNaN(month)) throw "Month could not be converted to a number";
    if (isNaN(day)) throw "Day could not be converted to a number";
    if (typeof month != 'number') throw "Month must be a number";
    if (typeof day != 'number') throw "Day must be a number";
    if (month < 1 || month > 12) throw "Month must be a value in the range 1-12";
    if (day < 1 || day > daysInMonths[month-1]) throw `There are not ${day} days in ${months[month-1]} - day must be a value 1-${daysInMonths[month-1]}`;
    let peopleWithSameBirthdays = [];
    (await getPeople()).forEach((object) => {
        let splitBirthday = object["date_of_birth"].split("/");
        if (splitBirthday[0] == month && splitBirthday[1] == day) {
            peopleWithSameBirthdays.push(object["first_name"]+" "+object["last_name"]);
        }
    });
    if (peopleWithSameBirthdays.length === 0) throw "There are no people with that birthday";
    return peopleWithSameBirthdays;
}

module.exports = {
    getPeople,
    getPersonById,
    sameEmail,
    manipulateIp,
    sameBirthday
}