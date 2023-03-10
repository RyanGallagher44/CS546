const bands = require('./data/bands');
const connection = require('./config/mongoConnection');

const main = async () => {
    const db = await connection.connectToDb();
    await db.dropDatabase();

    let blink182 = undefined;
    let goodCharlotte = undefined;
    let redHotChiliPeppers = undefined;

    /*
        1. Create a band of your choice.
        2. Log the newly created band. (Just that band, not all bands)
    */
    try {
        blink182 = await bands.create("Blink-182", ["Pop Punk", "Alternative Rock", "Punk Rock", "Skate Punk"], "http://www.blink182.com", "Cargo", ["Mark Hoppus", "Travis Barker", "Matt Skiba"], 1992);
        console.log(blink182);
    } catch (e) {
        console.log(e);
    }

    /*
        3. Create another band of your choice.
    */
    try {
        goodCharlotte = await bands.create("Good Charlotte", ["Pop Punk", "Alternative Rock", "Punk Rock", "Emo", "Pop Rock"], "http://www.goodcharlotte.com", "Daylight", ["Joel Madden", "Benji Madden", "Paul Thomas", "Billy Martin", "Dean Butterworth"], 1996);
    } catch (e) {
        console.log(e);
    }

    /*
        4. Query all bands, and log them all.
    */
    try {
        console.log(await bands.getAll());
    } catch (e) {
        console.log(e);
    }

    /*
        5. Create the 3rd band of your choice.
        6. Log the newly created 3rd band. (Just that band, not all bands)
    */
    try {
        redHotChiliPeppers = await bands.create("Red Hot Chili Peppers", ["Funk Rock", "Alternative Rock", "Funk Metal", "Rap Rock"], "http://www.redhotchilipeppers.com", "Capitol", ["Anthony Kiedis", "Flea", "Chad Smith", "John Frusciante"], 1983);
        console.log(redHotChiliPeppers);
    } catch (e) {
        console.log(e);
    }

    /*
        7. Rename the first band.
        8. Log the first band with the updated name.
    */
    try {
        blink182 = await bands.rename(blink182._id.toString(), "Blink");
        console.log(blink182);
    } catch (e) {
        console.log(e);
    }

    /*
        9. Remove the second band you created.
    */
    try {
        console.log(await bands.remove(goodCharlotte._id.toString()));
    } catch (e) {
        console.log(e);
    }

    /*
        10. Query all bands, and log them all.
    */
    try {
        console.log(await bands.getAll());
    } catch (e) {
        console.log(e);
    }

    /*
        11. Try to create a band with bad input parameters to make sure it throws errors.
    */
    try {
        console.log(await bands.create("The Rolling Stones", ["Rock", "Blues", "      ", "Hard Rock", "Rock and Roll"], "http://www.rollingstones.com", "Decca", ["Mick Jagger", "Keith Richards", "Ronnie Wood"], 1962));
    } catch (e) {
        console.log(e);
    }
    try {
        console.log(await bands.create("The Rolling Stones", ["Rock", "Blues", "Pop", "Hard Rock", "Rock and Roll"], "http://www.rs.com", "Decca", ["Mick Jagger", "Keith Richards", "Ronnie Wood"], 1962));
    } catch (e) {
        console.log(e);
    }
    try {
        console.log(await bands.create("The Rolling Stones", ["Rock", "Blues", "Pop", "Hard Rock", "Rock and Roll"], "http://www.rollingstones.com", "Decca", [47, "Keith Richards", "Ronnie Wood"], 1962));
    } catch (e) {
        console.log(e);
    }
    try {
        console.log(await bands.create("The Rolling Stones", ["Rock", "Blues", "Pop", "Hard Rock", "Rock and Roll"], "http://www.rollingstones.com", "Decca", ["Mick Jagger", "Keith Richards", "Ronnie Wood"], 1889.9));
    } catch (e) {
        console.log(e);
    }
    try {
        console.log(await bands.create());
    } catch (e) {
        console.log(e);
    }

    /*
        12. Try to remove a band that does not exist to make sure it throws errors.
    */
    try {
        console.log(await bands.remove("621dc9f36e23bf611b64babd"));
    } catch (e) {
        console.log(e);
    }

    /*
        13. Try to rename a band that does not exist to make sure it throws errors.
    */
    try {
        console.log(await bands.rename("620dc9f36e23bf611b64babd", "The Sliding Pebbles"));
    } catch (e) {
        console.log(e);
    }

    /*
        14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
    */
    try {
        blink182 = await bands.rename(blink182._id.toString(), "Blink");
        console.log(blink182);
    } catch (e) {
        console.log(e);
    }

    /*
        15. Try getting a band by ID that does not exist to make sure it throws errors.
    */
    try {
        console.log(await bands.get("620dc9f36e23bf611b64babd"));
    } catch (e) {
        console.log(e);
    }

    await connection.closeConnection();
    console.log('Done!');
};

main();