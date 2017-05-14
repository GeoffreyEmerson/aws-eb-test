const http = require('http')
const app = require('./src/app')

const port = process.env.PORT || 3000
const server = http.createServer(app)

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port)

// Put a friendly message on the terminal
console.log('Server running at localhost:' + port + '/')
