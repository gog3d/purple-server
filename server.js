'use strict';
/*
 * Primary file for the API
 */

//Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const config = require('./config.js');

const PORT = config.port;

const handlers = {};  //Define the handler
handlers.sample = function(data, callback){//Sample handler
  callback(406, {'name' : 'sample handler'});  //callback a http status code, and a payload object
};
handlers.notFound = function(data, callback) {//Not found handler
  callback(404);
};
const router = {  //Define a request router
  'sample' : handlers.sample,
};

//The server should respand to all request with a string
const server = http.createServer(function(req, res) {
  const parseUrl = url.parse(req.url, true);//Get the URL and parse it
  const path = parseUrl.pathname;  //Get the path
  const trimedPath = path.replace(/^\/+|\/+$/g, '');
  const queryStringObject = parseUrl.query;  //Get the query string as an object
  const method =req.method.toLowerCase();  //Get http method
  const headers = req.headers;  //Get the headers as an object
  //Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function(data){
    buffer += decoder.write(data);
  });
  req.on('end', function() {
    buffer += decoder.end();
    //Choose the handler this request should go to. If one is not found, use the notFound hendler
    const chosenHandler = typeof(router[trimedPath]) !== 'undefined' ? router[trimedPath] : handlers.notFound;
    //Construct the data object to send to handler
    const data = {
      'trimedPath' : trimedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer,
    };
    //console.dir({ data, chosenHandler });
    //Route teh request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload) {
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200;//Use the status code called back by the handler, or default to 200
      payload = typeof(payload) === 'object' ? payload : {};//Use the payload called back by the handler, or defult to 
      const payloadString = JSON.stringify(payload);//Convert the payload to a string
      res.writeHead(statusCode);
      res.end(payloadString); //Send the response
      console.dir({ statusCode, payload });//Log the request path
    });
  });
});

//Start the server
server.listen(PORT, function() {
  console.log(`The server is listening on port ${PORT} now`);
});