'use strict';

import * as cheerio from 'cheerio';
import request from 'request-promise';

export default class Wikifetch {
  constructor() {
    this.wikiPrefix = 'http://en.wikipedia.org/wiki/';
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
