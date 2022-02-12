'use strict';

/*
 * Primary file for the API
 */

//Dependencies

const http = require('http');
const url = require('url');

const PORT = 8000;

//The server should respand to all request with a string
const server = http.createServer(function(req, res){
  //Get the URL and parse it
  const parseUrl = url.parse(req.url, true);

  //Get the path
  const path = parseUrl.pathname;
  const trimedPath = path.replace(/^\/+|\/+$/g, '');
  
  //Get http method
  const method =req.method.toLowerCase();
  
  //Send the response
    console.dir({ parseUrl, path, trimedPath, method });
  res.end('hello server purple');
  
  //Log the request path
  
  
});

//Start the server, and have it listen on port 3000
server.listen(PORT, function(){
  console.log(`The server is listening on port ${PORT} now`);
});