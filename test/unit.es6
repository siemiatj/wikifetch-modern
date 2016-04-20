/* global it, describe */

import { expect } from 'chai';
import wikifetch from '../dist/wikifetch';

describe('Wikifetch test', () => {
  it('parse article title', function () {
    wikifetch('Dog')
    .then(obj => {
      expect(obj.title).to.equal('Dog');
    });
  });
});
