'use strict';

import * as cheerio from 'cheerio';
import request from 'request-promise';

export default class Wikifetch {
  constructor() {
    this.wikiPrefix = 'http://en.wikipedia.org/wiki/';
  }

  fetch(articleName) {
    return this.getArticle(articleName);
  }

  getArticle(articleName) {
    let articleURI = this.wikiPrefix + articleName;
    let options = {
      uri: articleURI,
      transform: body => {
        return cheerio.load(body);
      }
    };
    
    request(options)
      .then($ => {
        console.log($);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

