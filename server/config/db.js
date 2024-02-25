const mongoose = require('mongoose');


// Connect to the database

const ConnectionDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        if (conn) {
            console.log(`Mongo db connected :${conn.connection.host}`.green.underline.bold)
        } else {
            console.log(`Mongo db not connected :${conn.connection.host}`.red.underline.bold)
        }
    } catch (e) {
        console.log(e)
    }
}


module.exports = ConnectionDB
