// Stub API that answers 401 to everything; the bot's background re-auth must not kill the process.
const http = require('http');
const assert = require('assert');
const server = http.createServer((req, res) => { res.statusCode = 401; res.end('Invalid Credentials'); });
server.listen(0, async () => {
    const ip = `http://127.0.0.1:${server.address().port}/`;
    const r = require('../compiled/request.js');
    await r.authenticate(ip).catch(e => assert.strictEqual(e.statusCode, 401));
    await r.fetchAll(ip, 'collectibles').catch(e => assert.strictEqual(e.statusCode, 401));
    await new Promise(res => setTimeout(res, 500));
    console.log('PASS: process still alive after 401s');
    server.close();
});
