const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = "read_products";
const forwardingAddress = "https://f15f4ca3.ngrok.io"; //will change once URL is available

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/shopify', (req,res) => {
    const shop = req.query.shop;
    if (shop) {
        const state = nonce();
        const redirectUri = forwardingAddress + '/shopify/callback';
        const installUrl = "https://" + shop + "admin/ouath/authorize?client_id=" + apiKey +
        "&scope=" + scopes + 
        "&state=" + state +
        "&redirect_uri=" + redirectUri;

        res.cookie('state', state);
        res.redirect(installUrl);
    }

    else
        return res.status(400).send("Missing shop parameter. Please add ?shop=giftersixside.myshopify.com to your request"); 
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});