'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
    let unique = [];
    ar.sort();
    for (let i = 0; i < n - 1; i++) {
        if (ar[i + 1] == ar[i]) {
            unique.push(ar[i]);
        }
    }
    unique = [...new Set(unique)];
    unique.sort();
    let tsock = [];
    let pair = 0;
    for (let i = 0; i < unique.length; i++) {
        for (let j = 0; j < n; j++) {
            if (unique[i] == ar[j]) {
                tsock.push(ar[j]);
            }
        }
        if (tsock.length % 2 == 1) {
            tsock.pop();
        }
        // console.log(tsock);
    }
    pair = Math.floor(tsock.length/2);
    // console.log(unique + '\n' + ar + '\n' + tsock + '\n' + pair);
    return pair;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

    let result = sockMerchant(n, ar);

    ws.write(result + "\n");

    ws.end();
}
