const express = require('express')
const helmet = require('helmet')
const allRoutes = require('./routes/allRoutes.js')
const server = express()
const port = 9000

server.use(helmet())
server.use(express.json())

server.get('/', (req, res) => res.send("En vivo"))
server.use('/api', allRoutes);

server.listen(port, () => console.log(`\n===Listening on ${port}===\n`))
