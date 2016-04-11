var wikifetch = require('./lib').WikiFetch;

var page = 'Warsaw Metro';
var language = 'en';

console.log(wifiketch.WikiFetch.fetch(page));

// infobox(page, language, function(err, data){
//   if (err) {
//     // Oh no! Something goes wrong!
//     return;
//   }

//   // console.log(data);
//   console.log('END');
// });