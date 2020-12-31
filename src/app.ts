import express from 'express';

const app = express();
const port = 22992;
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name: 'Hello World',
  description: 'Aplicação de exemplo para um windows service em Nodejs',
  script: require('path').join(__dirname, 'helloworld.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=14096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
  svc.start();
});

svc.install();

svc.on('uninstall', function () {
  console.log('Uninstall complete.');
  console.log('The service exists: ', svc.exists);
});


//svc.uninstall(); 