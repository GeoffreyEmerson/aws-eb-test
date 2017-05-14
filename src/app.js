const fs = require('fs')
const path = require('path')

const indexPath = path.resolve(__dirname, '../public/index.html')
const html = fs.readFileSync(indexPath)

const log = function (entry) {
  fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n')
}

function app (req, res) {
  if (req.method === 'POST') {
    let body = ''

    req.on('data', function (chunk) {
      body += chunk
    })

    req.on('end', function () {
      if (req.url === '/') {
        log('Received message: ' + body)
      } else {
        req.url = '/scheduled'
        if (req.url) {
          log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at'])
        }
      }

      res.writeHead(200, 'OK', {'Content-Type': 'text/plain'})
      res.end()
    })
  } else {
    res.writeHead(200)
    res.write(html)
    res.end()
  }
};

module.exports = app
