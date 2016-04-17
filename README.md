Modern Wikifetch
=========

Author: [@sasklacz](https://twitter.com/#/sasklacz)

Based on:
[WikiFetch](https://github.com/bcoe/wikifetch)

Why
----

For one of my projects I needed a list of related links from a wiki article including text exerpt and an image.
This is a small experiment based on @bcoe's npm module which I rewrote to ES6. 

What
----

This small module will get you a json formatted data of a wikipedia article including links and images. 

Sample data returned by this code :

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


Use `wikifetch-modern` in your code. Calling `wikipetch` returns a Promise :
```
import wikifetch from 'wikifetch';

wikifetch('javascript')
.then((article) => {
  console.log('JSON ARTICLE: ', article);
})
```
