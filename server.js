'use strict';

/*
 * Primary file for the API
 */

//Dependencies

const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const PORT = 8000;

//The server should respand to all request with a string
const server = http.createServer(function(req, res){
  //Get the URL and parse it
  const parseUrl = url.parse(req.url, true);

  //Get the path
  const path = parseUrl.pathname;
  const trimedPath = path.replace(/^\/+|\/+$/g, '');
  
  //Get the query string as an object
  const queryStringObject = parseUrl.query;
  
  //Get http method
  const method =req.method.toLowerCase();
  
  //Get the headers as an object
  const headers = req.headers;
  
  //Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function(data){
    buffer += decoder.write(data);
  });
  req.on('end', function(){
    buffer += decoder.end();
    //Send the response
    
    res.end('hello server purple');
    //Log the request path
    console.dir({ parseUrl, path, trimedPath, method, queryStringObject, headers, buffer });
  });
  
  
  
  
});

//Start the server, and have it listen on port 3000
server.listen(PORT, function(){
  console.log(`The server is listening on port ${PORT} now`);
});