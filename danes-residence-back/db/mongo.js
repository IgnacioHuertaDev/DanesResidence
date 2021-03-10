const mongoose = require('mongoose')
const config = require('../config');

const connectionString = config.MONGO_DB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Database connected')
    } catch (error) {
        console.log('Cannot connect to the database:')
        console.log(error)
        process.exit(1) //Detiene app
    }
}

module.exports = connectDB