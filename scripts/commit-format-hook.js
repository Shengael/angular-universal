#!/usr/bin/env node

const fs = require('fs');
const util = require('util');

const MAX_LENGTH = 75;
const PATTERN = /^[a-z-]{2,12}: [A-Z][a-zA-Z0-9-_#&' \.]+$/;
const VERSION_PATTERN = /^([0-9]+\.)+[0-9]+$/;

function validateMsg(msg) {
    if (msg.length > MAX_LENGTH) return util.format('Too long (max: %d)', MAX_LENGTH);

    if (!PATTERN.test(msg) && !VERSION_PATTERN.test(msg))
        return util.format('Bad format (expected: %s)', PATTERN.toString());

    return null;
}

const firstLine = function (str) {
    return str.split('\n').shift();
};

const commitMsgFile = process.argv[2];

fs.readFile(commitMsgFile, function (err, buffer) {
    const msg = firstLine(buffer.toString());

    const error = validateMsg(msg);

    if (error) console.error(util.format('COMMIT MSG REJECTED: %s', error));
    else console.log('COMMIT MSG ACCEPTED');

    process.exit(error ? 1 : 0);
});
