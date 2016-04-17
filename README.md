What
----

Wikipedia scrapper that returns a JSON-formatted object of all the links and images in a wiki article.


Why
----

For one of my projects I needed a list of related links from a wiki article including text exerpt and an image.
This is a small experiment based on @bcoe's npm module which I rewrote to ES6, Promises and it's now usable outside of terminal. 


How
----

Based on `cheerio` for parsing the HTML, `request-promise` for getting data and `Bluebird` for promises.
Sample data returned by this module :

```javscript
	{
		"title": "Foobar Article",
		"links": {
			"Link_to_another_article: {
				"text": "Another article.", // the text that was linked.
				"title": "Another_article.", // title attribute <a/> tag.
				"occurrences": 1 // number of times this article was linked.
			}
		},
		"sections": {
			"Section Heading": {
				text: "text contents of section.",
				images: ["http://foobar.jpg"] // images occurring within this section.
			}
		}
	}
```


Usage
-----

Install `npm` module:

```bash
npm install wikifetch-modern
```


Use `wikifetch-modern` in your code. Calling `wikifetch` returns a Promise :
```
import wikifetch from 'wikifetch-modern';
// or var wikifetch = require('wikifetch-modern').default;

wikifetch('javascript')
.then(article => {
  console.log('JSON ARTICLE: ', article);
})
.catch(err => {
  // handle error
});;
```


Building
--------

To build the project run

```bash
gulp
```


Credits
-------

Based on:
[WikiFetch](https://github.com/bcoe/wikifetch)
