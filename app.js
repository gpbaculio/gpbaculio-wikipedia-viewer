const Server = require('./server.js')
const port = 3000;
const app = Server.app()

app.listen(port)
console.log(`Listening at http://localhost:${port}`)