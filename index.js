
const express = require('express');
const app = express();
const config = require('config');
const dotenv = require('dotenv');

dotenv.config({
    path: './config/config.env'
});

// require('./startup/mysql_database');
require('./startup/routes')(app);   //calling the function

if (!config.has('jwtPrivateKey')) {
    console.error("FATAL ERROR : jwtPrivateKey not defined");
    process.exit(1);
}

app.use(express.static('public'));

console.log(config.get('jwtPrivateKey'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
