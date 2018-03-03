// import express using common JS modules,
// rather than keyword 'import' enabled by ESxx (currently not supported by nodejs)
const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

// sets up config that listens for incoming requests,
// and routes them to different handlers
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // cookie expires in 30 days
        keys: [keys.cookieKey] // can specify multiple ones, cookie picks randomly
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// TEST for intro:
// app - Express app to register this route handler with
// get - watch for incoming requests with this method
// '/' - watch for request trying to access the '/' route
// req - object representing the incoming request
// res - object representing the outgoing response
// res.send({hi: 'there'}) - immediately send some JSON back to whoever made this request
// app.get('/', (req, res) => {
//     res.send({hi: 'there'});
// })

// uses the port Heroku provides us for prod env or
// just 5000 in other envs, e.g dev env on local machine
const PORT = process.env.PORT || 5000;
// instructs Express to tell Node to listen for incoming requests on a particular port
app.listen(PORT);
