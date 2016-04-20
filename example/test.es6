import wikifetch from '../dist/wikifetch';

wikifetch('javascript')
.then((article) => {
  console.log('ARTICLE: ', article);
})
.catch((error) => {
  console.log('ERROR: ', error);
});
