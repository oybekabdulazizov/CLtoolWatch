#!/usr/bin/env node

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const programme = require('caporal');
const fs = require('fs');
const process = require('process');

//#region helper function 
const getItemName = (path) => {
    return path.substring(path.lastIndexOf('\\') + 1);
}
//#endregion

programme
    .version('0.0.1')
    .argument('[filename]', 'Name of a file to execute')
    .action(() => {

        const add = debounce((path) => {
            console.log(`${getItemName(path)} has been created in folder ${path}`);
        }, 200);
        const change = debounce((path) => {
            console.log(`${getItemName(path)} has been modified.`);
        }, 200);
        const unlink = debounce((path) => {
            console.log(`${getItemName(path)} has been deleted from foler ${path}`);
        }, 200);
        const error = (error) => {
            // the below condition is to protect from throwing an error when a folder gets deleted. 
            // without the condition, it usually throws EPERM error, which is translated from ERROR_ACCESS_DENIED
            if (error.errno != '-4048') {
                console.log(error);
            } 
        };

        chokidar
            .watch(process.cwd(), { ignoreInitial: true })
            .on('add', add)
            .on('change', change)
            .on('unlink', unlink)
            .on('error', error)
            
        chokidar
            .watch(process.cwd(), { ignoreInitial: true })
            .on('addDir', add)
            .on('changeDir', change)
            .on('unlinkDir', unlink)
            .on('error', error)
    });
programme.parse(process.argv);
