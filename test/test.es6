import wikifetch from '../dist/wikifetch';

wikifetch('Polska')
.then((article) => {
  console.log('ARTICLE: ', article);
})
.catch((error) => {
  console.log('ERROR');
});
