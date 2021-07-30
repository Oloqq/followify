var assert = require('assert');
var utils = require('../src/utils')

describe('utils', function() {
  describe('#chunkify()', function() {
    let chunkify = utils.chunkify;
    it('works when actual length is a multiple of passed size', function() {
      let res = chunkify([1, 2, 3, 4], 2)
      let exp = [[1, 2], [3, 4]];
      assert.deepStrictEqual(res, exp);
    });
    it('works when actual length is NOT amultiple of passed size', function() {
      let res = chunkify([1, 2, 3, 4], 3)
      let exp = [[1, 2, 3], [4]];
      assert.deepStrictEqual(res, exp);         
    });
  });
});