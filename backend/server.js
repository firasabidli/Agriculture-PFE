const http = require('http');
const app = require("./app");

app.set('port',3001);

const server = http.createServer(app);

server.listen(3001);