// dirt simple node server

const http = require('http');
const fs = require('fs');

const hostname = '45.33.42.254';
const port = 3000;

const routes = [
  'gachaSim.js',
  'styles.css',
  'index.html'
]

const checkRoute = function (incomingRoute) {
  let foundRoute;
  routes.forEach(route => {
    if (incomingRoute.indexOf(route) > -1) {
      foundRoute = route;
    }
  });
  return foundRoute;
}

const handleGacha = function (res) {
  fs.readFile('gachaSim.js', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(data);
    res.end();
 });
}

const handleStyles = function (res) {
  fs.readFile('styles.css', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(data);
    res.end();
 });
}

const handleIndex = function (res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
 });
}

const handleUnknown = function (res) {
  handleIndex(res);
}


http.createServer(function (req, res) {
  let route = checkRoute(req.url);
  switch (route) {
    case 'gachaSim.js':
      handleGacha(res);
    break;
    case 'styles.css':
      handleStyles(res);
    break;
    case 'index.html':
      handlIndex(res);
    default:
      handleUnknown(res);
    break;
  }
}).listen(port);

