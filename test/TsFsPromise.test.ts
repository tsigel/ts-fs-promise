/// <reference path="../typings/tsd.d.ts" />

import fsPromise = require('../index');
import fs = require('fs');
import expect = require('expect.js');

var getPath = function (path) {
    return ('./test/' + path.replace('./', '')).replace(/\/\//g, '/');
};

try {
    fs.mkdirSync(getPath('test'));
} catch (e) {
    console.log(e);
}
try {
    fs.writeFileSync(getPath('test/test.text'), 'test');
} catch (e) {
    console.log(e);
}

describe('ts-fs-promise', () => {

    it('copySync', () => {

        var ok;
        fsPromise.copySync(getPath('test/test.text'), getPath('test.text'));
        ok = (fs.readFileSync(getPath('test.text'), 'utf8') == 'test');
        expect(ok).to.be(true);
        fs.unlinkSync(getPath('test.text'));

    });

    it('mkdirsSync', () => {

        var ok;
        fsPromise.mkdirsSync(getPath('some'));
        ok = fs.existsSync(getPath('some'));
        expect(ok).to.be(true);
        fs.rmdir(getPath('some'));

    });

    it('createFileSync', () => {

        var ok;
        fsPromise.createFileSync(getPath('test.text'));
        ok = fs.existsSync(getPath('test.text'));
        expect(ok).to.be(true);
        fs.unlinkSync(getPath('test.text'));

    });

    it('copy', (done) => {

        var ok = false;
        fsPromise.copy(getPath('test/test.text'), getPath('test.text')).then((status:boolean) => {
            ok = (status && fs.readFileSync(getPath('test.text'), 'utf8') == 'test');
            expect(ok).to.be(true);
            fs.unlinkSync(getPath('test.text'));
            done();
        });

    });

    it('createFile', (done) => {

        var ok = false;
        fsPromise.createFile(getPath('test.text')).then((status:boolean) => {
            ok = (status && fs.existsSync(getPath('test.text')));
            expect(ok).to.be(true);
            fs.unlinkSync(getPath('test.text'));
            done();
        });

    });

    it('mkdirs', (done) => {

        var ok = false;
        fsPromise.mkdirs(getPath('some')).then((status:boolean) => {
            ok = (status && fs.existsSync(getPath('some')));
            expect(ok).to.be(true);
            fs.rmdir(getPath('some'));
            done();
        });

    });

});