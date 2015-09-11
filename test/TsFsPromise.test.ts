/// <reference path="../typings/tsd.d.ts" />

import fsPromise = require('../index');
import fs = require('fs');
import expect = require('expect.js');

fs.mkdirSync('./test/test');
fs.writeFileSync('test/test/test.txt', 'test');

describe('ts-fs-promise', () => {

    it('copy', (done) => {

        var ok = false;
        fsPromise.copy('./test/test/test.txt', './test/test.txt').then((status:boolean) => {
            ok = (status && fs.readFileSync('./test/test.txt', 'utf8') == 'test');
            expect(ok).to.be(true);
            done();
        });

    });

});