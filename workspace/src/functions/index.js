
const functions = require('firebase-functions');
const { default: next } = require('next');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  // the absolute directory from the package.json file that will be pointing to the server
  // most likely the root of the project
  conf: {
    // This is the one that's throwing the error, either it should be an absolute path
    // or it's not being resolved correctly from the CWD
    distDir: path.join(__dirname, '.next'),
  },
});

const handle = server.getRequestHandler();

exports.nextServer = functions.https.onRequest((req, res) => {
  return server.prepare().then(() => {
    return handle(req, res);
  });
});
