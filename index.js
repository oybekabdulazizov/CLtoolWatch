#!/usr/bin/env node

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const programme = require('caporal');
const fs = require('fs');

const add = debounce(() => {
    console.log('new file added');
}, 200);

const change = debounce(() => {
    console.log('file modified');
}, 200);

const unlink = debounce(() => {
    console.log('file deleted');
}, 200);

programme
    .version('0.0.1')
    .argument('[filename]', 'Name of a file to execute')
    .action(async ({ filename }) => {
        const fname = filename || 'index.js';
        try {
            await fs.promises.access(fname);
        } catch (err) {
            throw new Error(`You either don't have proper access to the file ${fname} or it does not exist.`);
        }
        chokidar
            .watch('.')
            .on('add', add)
            .on('change', change)
            .on('unlink', unlink);
    });
programme.parse(process.argv);
