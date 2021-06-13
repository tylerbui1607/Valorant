const mongoose = require('mongoose');

//await function must in a async
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/valorant_shop_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect to valorant_shop_dev successfully!');
    } catch (error) {
        console.log('Fail to connect the database!');
    }
}

module.exports = { connect };
