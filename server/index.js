// import express using common JS modules, 
// rather than keyword 'import' enabled by ESxx (currently not supported by nodejs)
const express = require('express');

// sets up config that listens for incoming requests, 
// and routes them to different handlers
const app = express();

// app - Express app to register this route handler with
// get - watch for incoming requests with this method
// '/' - watch for request trying to access the '/' route
// req - object representing the incoming request
// res - object representing the outgoing response
// res.send({hi: 'there'}) - immediately send some JSON back to whoever made this request
app.get('/', (req, res) => {
    res.send({hi: 'there'});
})

app.listen(5000);

