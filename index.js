#!/usr/bin/env node

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');


const add = debounce(() => {
    console.log('new file added');
}, 200);

const change = debounce(() => {
    console.log('file modified');
});

const unlink = debounce(() => {
    console.log('file deleted');
})

chokidar
    .watch('.')
    .on('add', add)
    .on('change', change)
    .on('unlink', unlink);