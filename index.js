
const { STATUS_CODES } = require('http');

exports.githubWebhookHandler = async (req, res) => {
    try {
        if (!req || !res || !req.method) {
            throw new HTTPError(400);
        }

        if (req.method !== 'POST') {
            console.info(`Rejected ${req.method} request from ${req.ip} (${req.headers['user-agent']})`);
            throw new HTTPError(405, 'Only POST requests are accepted');
        }
        console.info(`Received request from ${req.ip} (${req.headers['user-agent']})`);
        console.log(req.body)
        res.status(200);
        res.send('Thanks!');
    } catch(e) {
        res.status(500).send(e.message);
        console.error(`HTTP 500: ${e.message}`);
    }
}


class HTTPError extends Error {
  constructor(code, message = STATUS_CODES[code]) {
    super(message);
    this.name = code.toString();
    this.statusCode = code;
  }
}