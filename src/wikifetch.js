'use strict';

import * as cheerio from 'cheerio';
import * as request from 'request-promise';
// import request from request
// import {sexy} from 'sexy-args'

// var cheerio = require('cheerio'),
    // var request = require('request'),
    // sexy = require('sexy-args');

// var cheerio = require('cheerio'); // Basically jQuery for node.js

const options = {
  uri: 'http://www.google.com',
  transform: function (body) {
    return cheerio.load(body);
  }
};

request(options)
  .then(function ($) {
      // Process html like you would with jQuery...
  })
  .catch(function (err) {
      // Crawling failed or Cheerio choked...
  });

