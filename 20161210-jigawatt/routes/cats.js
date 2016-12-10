
const express = require('express')
const JW      = require('jigawatt')
const Cats    = require('../middleware/cats.js')


// this is a demo so I can put this here.
const render = (req, res, next) =>

  JW.promisify(JW.branch(
    Cats.isCat
  , Cats.getCat
  , Cats.get
  ))(req)

  .then(data =>
    res.send(`
      <html>
      <body>
        ${data}
      </body>
      </html>
    `)
  )

  .catch(err => 
    res.send(`
      <html>
      <body>
        <pre>${err}</pre>
      </body>
      </html>
    `)
  )


const CatRoutes    = () => {

  const router = express.Router()

  router.get('/cats/hello-world', JW(Cats.hello))

  router.get('/cats/:topic', render)

  return router

}


module.exports = CatRoutes
