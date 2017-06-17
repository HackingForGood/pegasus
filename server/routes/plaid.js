
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var plaid = require('plaid');

let port = process.env.port || 9001;

var APP_PORT = process.env.APP_PORT || 8000; 
var PLAID_CLIENT_ID = process.env.PALID_CLIENT_ID || 'PLAID_CLIENT_ID';
var PLAID_SECRET = process.env.PLAID_SECRET || 'PLAID_SECRET';
var PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY || 'PLAID_PUBLIC_KEY'; 
var PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

var FAKE_PLAID_DATA = require('./FAKE_PLAID_DATA.json');

// We store the access_token in memory - in production, store it in a secure
// persistent data store
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

// Initialize the Plaid client
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

function main(app) {

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(bodyParser.json());

  app.post('/get_access_token', function(request, response, next) {


    PUBLIC_TOKEN = request.body.public_token;

    /*
    //COMMENT OUT IF YOU WANT REAL DATA FROM THE PUBLIC TOKEN

    client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
      if (error != null) {
        var msg = 'Could not exchange public_token!';
        console.log(msg + '\n' + error);
        return response.json({
          error: msg
        });
      }

      ACCESS_TOKEN = tokenResponse.access_token;
      ITEM_ID = tokenResponse.item_id;
      
      // TODO: Store ACCESS_TOKEN and ITEM_ID in database

      response.send({
        'error': false
      });

    });
    */
    response.send(
      'Will redirect to dashboard'
      //SEND TO DASHBOARD
    )
  });

  app.post('/transactions', function(request, response, next) {

    var startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    var endDate = moment().format('YYYY-MM-DD');

    let ACCESS_TOKEN = request.body.access_token;

    // uncomment this out if you want to actually get real data
    /*
    client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
      count: 250,
      offset: 0,
    }, function(error, transactionsResponse) {
      if (error != null) {
        return response.json({
          error: error
        });
      }
      
      // Handle transactions and calculate remainders
      let totalAmount = calculateRemainders(transactionsResponse);

      response.send({
        startDate: startDate,
        enddate: enddate,
        totalamount: totalamount 
      });

      console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');

    });

    */

    let totalAmount = calculateRemainders(FAKE_PLAID_DATA);
    response.send({
        startDate: startDate,
        endDate: endDate,
        totalAmount: totalAmount 
    });
  });

  function calculateRemainders(customerDetails) {
    let transactions = customerDetails.transactions;
    
    let total = 0;
    
    for (let i = 0; i < transactions.length; i++) {
      total += 1 - transactions[i].amount % 1;
    }
    
    return total.toFixed(2);
  }
  

}

module.exports = main;
