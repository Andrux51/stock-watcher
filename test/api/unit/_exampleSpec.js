// using Chai assert/expect framework (http://chaijs.com/)
var expect = require('chai').expect;
var assert = require('chai').assert;
// load JSON in from files... if connected to MongoDB or similar, you could put sample data in a /test/api/fixtures folder instead to keep the project folders clean
var fs = require('fs');
var _test = JSON.parse(fs.readFileSync(process.cwd() + '/api/json/test.json'));

// testing patterns shown at Mocha website (http://mochajs.org/#getting-started)
describe('example test suite', function() {
    describe('#example assertions', function() {
        it('should pass an example test to show that frameworks are running', function() {
            expect(true).to.be.true;
        });
    });

    describe('#test json file being pulled in', function() {
        it('should have the object from the test.json file', function() {
            expect(_test.everything).to.equal(42);
            expect(_test.foo).to.equal('bar');
        });
    });
});
