const http = require('http');

const TOTAL_REQUESTS = 1000;
const CONCURRENCY = 50;
const ENDPOINT = 'http://localhost:3000/api/registry/services';

let completed = 0;
let successful = 0;
let errors = 0;
let startTime = Date.now();

const agent = new http.Agent({ keepAlive: true });

function makeRequest() {
    if (completed >= TOTAL_REQUESTS) return;

    const req = http.get(ENDPOINT, { agent }, (res) => {
        res.resume(); // Consume response
        if (res.statusCode === 200) {
            successful++;
        } else {
            errors++;
        }
        completed++;
        if (completed === TOTAL_REQUESTS) {
            printResults();
        } else {
            makeRequest();
        }
    });

    req.on('error', (e) => {
        errors++;
        completed++;
        if (completed === TOTAL_REQUESTS) {
            printResults();
        } else {
            makeRequest();
        }
    });
}

function printResults() {
    const duration = (Date.now() - startTime) / 1000;
    const rps = successful / duration;

    console.log('Load Test Completed');
    console.log('-------------------');
    console.log(`Total Requests: ${TOTAL_REQUESTS}`);
    console.log(`Duration:       ${duration.toFixed(2)}s`);
    console.log(`RPS:            ${rps.toFixed(2)}`);
    console.log(`Successful:     ${successful}`);
    console.log(`Errors:         ${errors}`);
}

console.log(`Starting Load Test: ${TOTAL_REQUESTS} requests to ${ENDPOINT}`);
for (let i = 0; i < CONCURRENCY; i++) {
    makeRequest();
}
