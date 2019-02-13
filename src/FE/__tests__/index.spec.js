// Both Jest and Mocha can use chai. Comment out if you prefer jest syntax
import { expect } from 'chai';

describe('Test index.js', () => {
    it('1 + 1 should equal 2', () => {
        expect(1 + 1).to.equal(2);
    });
});
