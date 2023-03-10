const people = require('./people');
const stocks = require('./stocks');

async function main() {    
    /*
        getPersonById - people.js
    */
    console.log("getPersonById ------------------------------------");
    try {
        // should work
        console.log(await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10"));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await people.getPersonById(-1))
    } catch (e) {
        console.log(e);
    }
    try {
        // should error (person not found)
        console.log(await people.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff'));
    } catch (e) {
        console.log(e);
    }

    /*
        sameEmail - people.js
    */
    console.log("sameEmail ------------------------------------");
    try {
        // should work
        console.log(await people.sameEmail("harvard.edu"));
    } catch (e) {
        console.log(e);
    }
    try {
        // should work
        console.log(await people.sameEmail("HARVARD.EDU"))
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await people.sameEmail("foobar"));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await people.sameEmail("foobar."));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await people.sameEmail(".com"));
    } catch (e) {
        console.log(e);
    }

    /*
        manipulateIp - people.js
    */
    console.log("manipulateIp ------------------------------------");
    try {
        // should work
        console.log(await people.manipulateIp());
    } catch (e) {
        console.log(e);
    }

    /*
        sameBirthday - people.js
    */
    console.log("sameBirthday ------------------------------------");
    try {
        // should work
        console.log(await people.sameBirthday(9, 25));
    } catch (e) {
        console.log(e);
    }
    try {
        // should work
        console.log(await people.sameBirthday("09", "25"));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await people.sameBirthday(9, 31));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await people.sameBirthday(13, 25));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await people.sameBirthday(2, 29));
    } catch (e) {
        console.log(e);
    }

    /*
        listShareholders - stocks.js
    */
    console.log("listShareholders ------------------------------------");
    try {
        // should work
        console.log(await stocks.listShareholders("Aeglea BioTherapeutics, Inc."));
    } catch (e) {
        console.log(e);
    }
    try {
        // should work
        console.log(await stocks.listShareholders("Powell Industries, Inc."));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await stocks.listShareholders('foobar'));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await stocks.listShareholders());
    } catch (e) {
        console.log(e);
    }
    
    /*
        totalShares - stocks.js
    */
    console.log("totalShares ------------------------------------");
    try {
        // should work
        console.log(await stocks.totalShares('Aeglea BioTherapeutics, Inc.'));
    } catch (e) {
        console.log(e);
    }
    try {
        // should work
        console.log(await stocks.totalShares('Nuveen Preferred and Income 2022 Term Fund'));
    } catch (e) {
        console.log(e);
    }
    try {
        // should work
        console.log(await stocks.totalShares('Powell Industries, Inc.'));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await stocks.totalShares(43));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await stocks.totalShares(' '));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await stocks.totalShares('Foobar Inc'));
    } catch (e) {
        console.log(e);
    }

    /*
        listStocks - stocks.js
    */
    console.log("listStocks ------------------------------------"); 
    try {
        // should work
        console.log(await stocks.listStocks("Grenville", "Pawelke"));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await stocks.listStocks("Ryan", "Gallagher"));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await stocks.listStocks("     ", "     "));
    } catch (e) {
        console.log(e);
    }
    try {
        // should error
        console.log(await stocks.listStocks(1,2));
    } catch (e) {
        console.log(e);
    }
}

main();