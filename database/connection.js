const mongoose = require("mongoose");

async function initialize_mongo_connectivity() {
    const URI = process.env.NODE_ENV === "DEVELOPMENT" ? "mongodb://localhost:27017/restaurant" : process.env.PROD_DB_URL;
    try {
        await mongoose.connect(URI, {
            dbName: process.env.PROD_DB_NAME
        });
        console.log("Mongo Db connectivity success");
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    initialize_mongo_connectivity
}