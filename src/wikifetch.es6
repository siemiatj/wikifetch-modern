import * as cheerio from 'cheerio';
import Cheerio from 'cheerio';
import Bluebird from 'bluebird';
import request from 'request-promise';

class Wikifetch {
  constructor(articleName, wikiPrefix) {
    this.wikiPrefix = wikiPrefix;
    this.articleName = articleName;
    this.fetchedArticle = {};
  }

  fetch(){
    let { parseTitle, parseLinks, parseSections, fetchedArticle, articleName, wikiPrefix } = this,
      articleURI = wikiPrefix + articleName,
      options = {
        uri: articleURI,
        transform: body => {
          return cheerio.load(body);
        }
      };

    return new Bluebird(function (resolve, reject) {
      request(options)
        .then($ => {
          parseTitle($, fetchedArticle);
          parseLinks($, fetchedArticle);
          parseSections($, fetchedArticle);

          resolve(fetchedArticle);
        })
        .catch(err => {
          reject(err);
        });

    });
  }

  parseTitle(ch, fe) {
    let title = ch('#firstHeading').text();
    fe.title = title;
  }

  parseLinks(ch, fe) {
    fe.links = {};

    ch('#bodyContent p a').each((idx, el) => {
      let element = new Cheerio(el),
        href = element.attr('href'),
        entityName = href.replace(/\/wiki\//g, '');

      // Only extract article links.
      if (!href.match(/\/wiki\//g)) return;

      // Create or update the link lookup table.
      if (fe.links[entityName]) {
        fe.links[entityName].occurrences++;
      } else {
        fe.links[href.replace(/\/wiki\//g, '')] = {
          title: element.attr('title'),
          occurrences: 1,
          text: element.text()
        };
      }

      // Replace the element in the page with a reference to the link.
      element.replaceWith('[[' + entityName + ']]');
    });
  }

  parseSections(ch, fe){
    let currentHeadline = fe.title;
    fe.sections = {};

    ch('#bodyContent p,h2,h3,img').each((idx, el) => {
      let element = new Cheerio(el);

      // Load new headlines as we observe them.
      if (element.is('h2') || element.is('h3')) {
        currentHeadline = element.text().trim();
        return;
      }

      // Initialize the object for this section.
      if (!fe.sections[currentHeadline]) {
        fe.sections[currentHeadline] = {
          text: '',
          images: []
        };
      }

      // Grab images from the section don't grab spammy ones.
      if (element.is('img') && element.attr('width') > 50) {
        fe.sections[currentHeadline].images.push( element.attr('src').replace('//', 'http://') );
        return;
      }

      fe.sections[currentHeadline].text += element.text();
    });
  }
}

// this must return a promise
export default function wikifetch(articleName, wikiPrefix='http://en.wikipedia.org/wiki/') {
  let newWikiFetch = new Wikifetch(articleName, wikiPrefix);

  return newWikiFetch.fetch();
}
