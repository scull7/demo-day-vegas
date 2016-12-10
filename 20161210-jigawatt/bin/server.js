
const app    = require('../app.js')
const server = require('http').Server(app)

const port   = process.env.PORT_PROPS_CHECK || 4242
const name   = process.env.APP_NAME || 'Demo Day Vegas - Props Check'


server.listen(port, () => {
  console.info(`${name} server listening on port: ${port}`)
})
