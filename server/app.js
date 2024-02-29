const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const colors = require('colors');
const ConnectionDB = require('./config/db');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
ConnectionDB();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    // graphiql: process.env.NODE_ENV === 'development'
    graphiql: true
}));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


