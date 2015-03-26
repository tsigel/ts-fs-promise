/// <reference path="../types/fs-extra.d.ts" />
/// <reference path="../types/es6-promise.d.ts" />
/// <reference path="../types/FsPromise.d.ts" />

import fs = require("fs-extra");
import modulePromise = require("es6-promise");

var Promise = modulePromise.Promise;

class FsPromise implements tsFsPromise.Main {

    public readJSON(path:string):Promise<any> {
        return this.getFsPromise("readJSON", [path]);
    }

    public readFile(path:string, encoding:string):Promise<any> {
        return this.getFsPromise("readFile", [path , encoding]);
    }

    public copy(src:string, dest:string):Promise<boolean> {
        return this.getFsPromise("copy", [src, dest]);
    }

    public createFile(file:string):Promise<boolean> {
        return this.getFsPromise("createFile", [])
    }

    public mkdirs(dir:string):Promise<boolean> {
        return this.getFsPromise("mkdirs", [dir]);
    }
    public mkdirp(dir:string):Promise<boolean> {
        return this.getFsPromise("mkdirp", [dir]);
    }

    public outputFile(file: string, data: any):Promise<boolean> {
        return this.getFsPromise("outputFile", [file, data]);
    }

    public outputJSON(file: string, data: any):Promise<boolean> {
        return this.getFsPromise("outputJSON", [file, data]);
    }

    public remove(dir: string):Promise<boolean> {
        return this.getFsPromise("remove", [dir]);
    }

    public writeJSON(file: string, object: any, options?: tsFsPromise.OpenOptions):Promise<boolean> {
        return this.getFsPromise("writeJSON", [file, object, options]);
    }

    public rename(oldPath: string, newPath: string):Promise<boolean> {
        return this.getFsPromise("rename", [oldPath, newPath]);
    }

    public stat(path: string):Promise<tsFsPromise.Stats> {
        return this.getFsPromise("stat", [path]);
    }

    public writeFile(filename: string, data: any, encoding?: string):Promise<boolean> {
        return this.getFsPromise("writeFile", [filename, data, encoding]);
    }

    private getFsPromise(method:string, args:Array<any>):Promise<any> {
        return new Promise((resolve, reject) => {
            var callback = function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(typeof data == "undefined" ? true : data);
                }
            };
            args.push(callback);
            fs[method].apply(fs, args);
        });
    }

}

export = FsPromise;