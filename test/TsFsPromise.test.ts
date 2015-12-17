/// <reference path="../typings/tsd.d.ts" />

import fsPromise = require('../index');
import fs = require('fs');
import expect = require('expect.js');

var getPath = function (path?:string) {
    return ('./test/' + (path || "").replace('./', '')).replace(/\/\//g, '/');
};

var getTestFilePath = function () {
    return getPath('test/test.text');
};

var check = function (promise:Promise<any>) {
    promise.catch(() => {
        expect().fail('File system error!');
    });
    return promise;
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
        fsPromise.copySync(getTestFilePath(), getPath('test.text'));
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

    it("readFileSync", () => {
        expect(fsPromise.readFileSync(getTestFilePath(), "utf8")).to.be('test');
    });

    it("writeFileSync", () => {
        fs.writeFileSync(getPath("test.txt"), "test");
        expect(fs.readFileSync(getPath("test.txt"), "utf8")).to.be('test');
        fs.unlinkSync(getPath("test.txt"));
    });

    it("readDirSync", () => {

        var files = fsPromise.readdirSync(getPath());
        var ok = files.indexOf("test") != -1 && files.indexOf("TsFsPromise.test.ts") != -1;
        expect(ok).to.be(true);

    });

    it('copy', (done) => {

        var ok = false;
        check(fsPromise.copy(getPath('test/test.text'), getPath('test.text'))).then((status:boolean) => {
            ok = (status && fs.readFileSync(getPath('test.text'), 'utf8') == 'test');
            expect(ok).to.be(true);
            fs.unlinkSync(getPath('test.text'));
            done();
        });

    });

    it('createFile', (done) => {

        var ok = false;
        check(fsPromise.createFile(getPath('test.text'))).then((status:boolean) => {
            ok = (status && fs.existsSync(getPath('test.text')));
            expect(ok).to.be(true);
            fs.unlinkSync(getPath('test.text'));
            done();
        });

    });

    it('mkdirs', (done) => {

        var ok = false;
        check(fsPromise.mkdirs(getPath('some'))).then((status:boolean) => {
            ok = (status && fs.existsSync(getPath('some')));
            expect(ok).to.be(true);
            fs.rmdir(getPath('some'));
            done();
        });

    });

    it('readFile', (done) => {

        var ok = false;
        check(fsPromise.readFile(getPath('test/test.text'), 'utf8')).then((fileText:string) => {
            ok = fileText == 'test';
            expect(ok).to.be(true);
            done();
        });

    });

    it("writeFile", (done) => {

        var ok = false;
        check(fsPromise.writeFile(getPath('test.txt'), 'test')).then(() => {
            expect(fs.readFileSync(getPath('test.txt'), 'utf8')).to.be('test');
            fs.unlinkSync(getPath('test.txt'));
            done();
        });

    });

    it("readDir", (done) => {

        var ok = false;
        check(fsPromise.readdir(getPath())).then((files:Array<string>) => {
            ok = files.indexOf("test") != -1 && files.indexOf("TsFsPromise.test.ts") != -1;
            expect(ok).to.be(true);
            done();
        });

    });

});