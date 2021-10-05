const { Client } = require('pg');
const config = require('config');

//database connection
module.exports = function () {
    // creating a database/connecting to an existing database
    const client = new Client({
        user: config.get("user"),          
        password: config.get("password"),
        port: config.get("port"),                 
        database: config.get("database")

    });

    client.connect()
        .then(() => console.log("Successfully connected to PostgreSQL database"))
        .catch(error => console.log(error))
        .finally(() => client.end())
}