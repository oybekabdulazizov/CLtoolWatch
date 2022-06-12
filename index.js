#!/usr/bin/env node

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const programme = require('caporal');
const fs = require('fs');
const process = require('process');

//#region helper function 
const getFilename = (path) => {
    return path.substring(path.lastIndexOf('\\') + 1);
}
//#endregion

programme
    .version('0.0.1')
    .argument('[filename]', 'Name of a file to execute')
    .action(() => {
        // chokidar.watch('.').on('change', () => console.log(filename));
        // const fname = filename || 'index.js';

        const add = debounce((path) => {
            console.log(`${getFilename(path)} has been created.`);
        }, 200);
        const change = debounce((path) => {
            console.log(`${getFilename(path)} has been modified.`);
        }, 200);
        const unlink = debounce((path) => {
            console.log(`${getFilename(path)} has been deleted.`);
        }, 200);

        // try {
        //     await fs.promises.access(getFilename(path));
        // } catch (err) {
        //     throw new Error(`You either don't have proper access to the file ${fname} or it does not exist.`);
        // }

        chokidar
            .watch(process.cwd(), { ignoreInitial: true })
            .on('add', add)
            .on('change', change)
            .on('unlink', unlink); 
    });
programme.parse(process.argv);
