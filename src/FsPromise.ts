/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./FsPromise.d.ts" />

import fs = require("fs-extra");
import modulePromise = require("es6-promise");

var Promise = modulePromise.Promise;

class FsPromise implements tsFsPromise.Main {

    public copy(src:string, dest:string, filter?:(src:string) => boolean):Promise<boolean> {
        return this.getFsPromise("copy", [src, dest, filter].filter((arg) => !!arg));
    }

    public copySync(src:string, dest:string, filter?:(src:string) => boolean):void {
        fs.copySync(src, dest, filter);
    }

    public createFile(file:string):Promise<boolean> {
        return this.getFsPromise("createFile", [file])
    }

    public createFileSync(file:string):void {
        fs.createFileSync(file);
    }

    public mkdirs(dir:string):Promise<boolean> {
        return this.getFsPromise("mkdirs", [dir]);
    }

    public mkdirsSync(dir:string):void {
        fs.mkdirsSync(dir);
    }

    public outputFile(file:string, data:any):Promise<boolean> {
        return this.getFsPromise("outputFile", [file, data]);
    }

    public outputFileSync(file:string, data:any):void {
        fs.outputFileSync(file, data);
    }

    public outputJSON(file:string, data:any):Promise<boolean> {
        return this.getFsPromise("outputJSON", [file, data]);
    }

    public outputJSONSync(file:string, data:any):void {
        fs.outputJSONSync(file, data);
    }

    public readJSON(file:string, options?:tsFsPromise.OpenOptions):Promise<any> {
        return this.getFsPromise("readJSON", [file, options]);
    }

    public readJSONSync(file:string, options?:tsFsPromise.OpenOptions):any {
        return fs.readJSONSync(file, options);
    }

    public remove(dir:string):Promise<boolean> {
        return this.getFsPromise("remove", [dir]);
    }

    public removeSync(dir:string):void {
        fs.removeSync(dir);
    }

    public writeJSON(file:string, object:any, options?:tsFsPromise.OpenOptions):Promise<boolean> {
        return this.getFsPromise("writeJSON", [file, object, options]);
    }

    public writeJSONSync(file:string, object:any, options?:tsFsPromise.OpenOptions):void {
        fs.writeJSONSync(file, object, options);
    }

    public rename(oldPath:string, newPath:string):Promise<boolean> {
        return this.getFsPromise("rename", [oldPath, newPath]);
    }

    public renameSync(oldPath:string, newPath:string):void {
        fs.renameSync(oldPath, newPath);
    }

    public truncate(fd:number, len:number):Promise<boolean> {
        return this.getFsPromise("truncate", [fd, len]);
    }

    public truncateSync(fd:number, len:number):void {
        fs.truncateSync(fd, len);
    }

    public chown(path:string, uid:number, gid:number):Promise<boolean> {
        return this.getFsPromise("chown", [path, uid, gid]);
    }

    public chownSync(path:string, uid:number, gid:number):void {
        fs.chownSync(path, uid, gid);
    }

    public fchown(fd:number, uid:number, gid:number):Promise<boolean> {
        return this.getFsPromise("fchown", [fd, uid, gid]);
    }

    public fchownSync(fd:number, uid:number, gid:number):void {
        fs.fchownSync(fd, uid, gid);
    }

    public lchown(path:string, uid:number, gid:number):Promise<boolean> {
        return this.getFsPromise("lchown", [path, uid, gid]);
    }

    public lchownSync(path:string, uid:number, gid:number):void {
        fs.lchownSync(path, uid, gid);
    }

    public chmodSync(path:string, mode:number):void {
        fs.chmodSync(path, mode);
    }

    public fchmod(fd:number, mode:number):Promise<boolean> {
        return this.getFsPromise("fchmod", [fd, mode])
    }

    public fchmodSync(fd:number, mode:number):void {
        fs.fchmodSync(fd, mode);
    }

    public lchmod(path:string, mode:string):Promise<boolean> {
        return this.getFsPromise("lchmod", [path, mode]);
    }

    public lchmodSync(path:string, mode:string):void {
        fs.lchmodSync(path, mode);
    }

    public stat(path:string):Promise<tsFsPromise.Stats> {
        return this.getFsPromise("stat", [path]);
    }

    public statSync(path: string): tsFsPromise.Stats {
        return fs.statSync(path);
    }

    public readFile(path:string, encoding):Promise<any> {
        return this.getFsPromise("readFile", [path, encoding]);
    }

    public readFileSync(filename: string, encoding):any {
        return fs.readFileSync(filename, encoding);
    }

    public writeFile(filename:string, data:any, encoding?:string):Promise<boolean> {
        return this.getFsPromise("writeFile", [filename, data, encoding]);
    }

    public writeFileSync(filename: string, data: any, encoding?: string):void {
        fs.writeFileSync(filename, data, encoding);
    }

    public readdir(path:string):Promise<Array<string>> {
        return this.getFsPromise("readdir", [path]);
    }

    public readdirSync(path:string):Array<string> {
        return fs.readdirSync(path);
    }

    private getFsPromise(method:string, args:Array<any>):Promise<any> {
        return new Promise((resolve, reject) => {
            var callback = function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data || true);
                }
            };
            args.push(callback);
            fs[method].apply(fs, args);
        });
    }

}

export = FsPromise;