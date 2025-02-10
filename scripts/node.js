const os = require('os');
const fs = require('fs');
const http = require('http');

const port = 8085

// server : http://localhoost:8085
const Server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html'})
    fs.readFile('index.html', function(error, data) {
        if (error) {
            res.writeHead(404)  
            res.write('Error: File does not found')
        } else {
            res.write(data)
        }
        res.end()
    })
})

Server.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listen on port ' + port)
    }
})