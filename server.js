 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// If we are in development or testing, loads the .env into our environment to access secret key
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

//importing stripe object (library) and passing in the SECRET KEY in .env
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
//If on heroku, the process PORT will be set up 
const port = process.env.PORT  || 5000;

//make sure all request coming in 'body' comes in JSON form 
app.use(bodyParser.json());
//make sure url strings we get are VALID
app.use(bodyParser.urlencoded({ extend: true }));

//cross origin request, origin eg. host:3000
//allows cross request from different origin
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    //serve static files, path
    app.use(express.static(path.join(__dirname, 'client/build')));

    // for every URL hit, if user wants to 'get' sth, send them the files HTML, CSS.. 
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port' + port);
})

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };
    
    // an API call which can succeed or fail
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            //inform client with error
            res.status(500).send({ error: stripeErr });
        } else {
            //inform client of success
            res.status(200).send({ success: stripeRes });
        }
    });
});