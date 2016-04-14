'use strict';

import * as cheerio from 'cheerio';
import request from 'request-promise';

export class Wikifetch {
  constructor(articleName) {
    this.wikiPrefix = 'http://en.wikipedia.org/wiki/';
    this.articleName = articleName;
    this.fetchedArticle = {};
  }

  fetch(articleName) {
    this.getArticle(articleName);
  }

  getArticle(articleName) {
    let articleURI = this.wikiPrefix + articleName;
    let options = {
      uri: articleURI,
      transform: body => {
        return cheerio.load(body);
      }
    };
    let {parseTitle} = this;
    
    request(options)
      .then($ => {
        parseTitle($);
      })
      .catch(err => {
        console.log(err);
      });
  }

  parseTitle(ch) {
    let title = ch('#firstHeading').text();
    console.log('TITLE: ', title);
  }

  parseLinks() {}

  parseSections(){}
}

export default wikifetch(articleName) {
  let newWikiFetch = new WikiFetch(articleName);

  newWikiFetch.fetch()
  .then(function() {
    return newWikiFetch.fetchedArticle;
  })
  .catch(function() {
    console.log('error');
  });
}