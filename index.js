#!/usr/bin/env node

const chokidar = require('chokidar');

chokidar.watch('.')
    .on('add', () => console.log('started'))
    .on('change', () => console.log('changed'))
    .on('unlink', () => console.log('unlinked'));