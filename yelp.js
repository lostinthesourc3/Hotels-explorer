'use strict'

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'bN0YpgDO05ZjJCRYAM-0mwyn2GubaECDDOlg7vNmnKFWCyFjtbI1VSaEzC8_yIhGOHt2G96ChQXzFBuMk3GNUseo3J0TfYpvkRjcvHDLtO4mHOYazC3VGpzvhFJ2XXYx';

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});
