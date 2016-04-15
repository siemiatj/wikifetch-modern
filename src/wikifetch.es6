'use strict';

import * as cheerio from 'cheerio';
import request from 'request-promise';

class Wikifetch {
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
    let {parseTitle, parseLinks, parseSections, fetchedArticle} = this;

    console.log('FETCHED1: ', fetchedArticle, parseTitle);
    
    request(options)
      .then($ => {
        parseTitle($);
        parseLinks($);
        parseSections($);

        console.log('FETCHED10: ', fetchedArticle);

        return fetchedArticle;
      })
      .catch(err => {
        //handle error
        console.log(err);
      });
  }

  parseTitle(ch) {
    let title = ch('#firstHeading').text();

    console.log('FETCHED2: ', this.fetchedArticle)

    this.fetchedArticle.title = title;
    return;
  }

  parseLinks(ch) {
    this.fetchedArticle.links = {};
    // parsedArticle.links = {};

    console.log('FETCHED3: ', this.fetchedArticle)

    ch('#bodyContent p a').each(() => {
      let element = cheerio(this),
        href = element.attr('href'),
        entityName = href.replace('/wiki/', '');

      // Only extract article links.
      if ( href.indexOf('/wiki/') < 0 ) return;

      // Create or update the link lookup table.
      if ( this.fetchedArticle.links[entityName] ) {
        this.fetchedArticle.links[entityName].occurrences++;
      } else {
        this.fetchedArticle.links[href.replace('/wiki/', '')] = {
          title: element.attr('title'),
          occurrences: 1,
          text: element.text()
        };
      }

      // Replace the element in the page with a reference to the link.
      element.replaceWith('[[' + entityName + ']]');
    });

    return;
  }

  parseSections(ch){
    console.log('FETCHED4: ', this.fetchedArticle);

    let currentHeadline = this.fetchedArticle.title;

    this.fetchedArticle.sections = {};

    ch('#bodyContent p,h2,h3,img').each(function() {
      let element = cheerio(this);

      // Load new headlines as we observe them.
      if (element.is('h2') || element.is('h3')) {
        currentHeadline = element.text().trim();
        return;
      }

      // Initialize the object for this section.
      if (!this.fetchedArticle.sections[currentHeadline]) {
        this.fetchedArticle.sections[currentHeadline] = {
          text: '',
          images: []
        };
      }

      // Grab images from the section don't grab spammy ones.
      if (element.is('img') && element.attr('width') > 50) {
        this.fetchedArticle.sections[currentHeadline].images.push( element.attr('src').replace('//', 'http://') );
        return;
      }

      this.fetchedArticle.sections[currentHeadline].text += element.text();
    });

    return;
  }
}

export default function wikifetch(articleName) {
  let newWikiFetch = new Wikifetch(articleName);

  return newWikiFetch.fetch();
}