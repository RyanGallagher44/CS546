const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const bands = data.bands;
const albums = data.albums;

async function main() {
    const db = await dbConnection.dbConnection();
    await db.dropDatabase();

    let blink182 = await bands.create("Blink-182", ["Pop Punk", "Alternative Rock", "Punk Rock", "Skate Punk"], "http://www.blink182.com", "Cargo", ["Mark Hoppus", "Travis Barker", "Matt Skiba"], 1992);

    let goodCharlotte = await bands.create("Good Charlotte", ["Pop Punk", "Alternative Rock", "Punk Rock", "Emo", "Pop Rock"], "http://www.goodcharlotte.com", "Daylight", ["Joel Madden", "Benji Madden", "Paul Thomas", "Billy Martin", "Dean Butterworth"], 1996);

    let redHotChiliPeppers = await bands.create("Red Hot Chili Peppers", ["Funk Rock", "Alternative Rock", "Funk Metal", "Rap Rock"], "http://www.redhotchilipeppers.com", "Capitol", ["Anthony Kiedis", "Flea", "Chad Smith", "John Frusciante"], 1983);

    let theRollingStones = await bands.create("The Rolling Stones", ["Rock", "Blues", "Pop", "Hard Rock", "Rock and Roll"], "http://www.rollingstones.com", "Decca", ["Mick Jagger", "Keith Richards", "Ronnie Wood"], 1962);

    let aerosmith = await bands.create("Aerosmith", ["Hard Rock", "Blues Rock", "Rock and Roll", "Glam Metal", "Heavy Metal"], "http://www.aerosmith.com", "Columbia", ["Steven Tyler", "Tom Hamilton", "Joey Kramer", "Joe Perry", "Brad Whitford"], 1970);

    let journey = await bands.create("Journey", ["Arena Rock", "Hard Rock", "Soft Rock", "Progressive Rock", "Jazz-Rock"], "http://www.journeymusic.com", "Columbia", ["Neal Schon", "Jonathon Cain", "Randy Jackson", "Deen Castronovo", "Arnel Pineda", "Jason Derlatka"], 1973);

    let bowlingForSoup = await bands.create("Bowling for Soup", ["Pop Punk", "Pop Rock", "Alternative Rock", "Power Pop"], "http://www.bowlingforsoup.com", "Brando", ["Jaret Reddick", "Chris Burney", "Gary Wiseman", "Rob Felicetti"], 1994);

    let theKillers = await bands.create("The Killers", ["Alternative Rock", "Indie Rock", "Post-Punk Revival", "New Wave", "Heartland Rock", "Pop Rock"], "http://www.thekillersmusic.com", "Island", ["Brandon Flowers", "Dave Keuning", "Mark Stoermer", "Ronnie Vannucci Jr."], 2001);

    let theAllAmericanRejects = await bands.create("The All-American Rejects", ["Alternative Rock", "Emo Pop", "Power Pop", "Pop Rock", "Pop Punk", "Emo"], "http://www.allamericanrejects.com", "Epitaph", ["Tyson Ritter", "Nick Wheeler", "Mike Kennerty", "Chris Gaylor"], 1999);

    let jimmyEatWorld = await bands.create("Jimmy Eat World", ["Alternative Rock", "Emo Pop", "Emo", "Power Pop", "Pop Punk"], "http://www.jimmyeatworld.com", "Wooden Blue", ["Jim Adkins", "Zach Lind", "Tom Linton", "Rick Burch"], 1993);

    console.log("Done seeding the database");

    await dbConnection.closeConnection();
}

main();