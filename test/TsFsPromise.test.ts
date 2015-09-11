/// <reference path="../typings/tsd.d.ts" />

import fsPromise = require('../index');
import fs = require('fs');
import expect = require('expect.js');

try {
    fs.mkdirSync('./test/test');
} catch (e) {
    console.log(e);
}
try {
    fs.writeFileSync('test/test/test.txt', 'test');
} catch (e) {
    console.log(e);
}

describe('ts-fs-promise', () => {

    it('copySync', () => {

        var ok;
        fsPromise.copySync('./test/test/test.txt', './test/test.txt');
        ok = (fs.readFileSync('./test/test.txt', 'utf8') == 'test');
        expect(ok).to.be(true);
        fs.unlinkSync('./test/test.txt');
    });

    it('createFileSync', () => {

        var ok;
        fsPromise.createFileSync('./test/test.txt');
        ok = (fs.existsSync('./test/test/test.txt'));
        expect(ok).to.be(true);
        fs.unlinkSync('./test/test.txt');

    });

    it('copy', (done) => {

        var ok = false;
        fsPromise.copy('./test/test/test.txt', './test/test.txt').then((status:boolean) => {
            ok = (status && fs.readFileSync('./test/test.txt', 'utf8') == 'test');
            expect(ok).to.be(true);
            fs.unlinkSync('./test/test.txt');
            done();
        });

    });

    it('createFile', (done) => {

        var ok = false;
        fsPromise.createFile('./test/test.txt').then((status:boolean) => {
            ok = (status && fs.existsSync('./test/test.txt'));
            expect(ok).to.be(true);
            fs.unlinkSync('./test/test.txt');
            done();
        });

    });

});