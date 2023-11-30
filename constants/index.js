const mongoose = require('mongoose');
const initData = require('./data.js');
const listing = require('../models/listing.js');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

main()
.then(() => {
    console.log("connected to Database");
})
.catch((err) => {
    console.log(err);
});


const initDB = async () => {
    await listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "65610fd6280fbcb6516595fa"
    }));
    await listing.insertMany(initData.data);
    console.log("Data intialized successfully");
}

initDB();