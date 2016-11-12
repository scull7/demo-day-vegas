
const express = require('express')


const Sys = () => {

  const router = express.Router()


  router.get('/sys/alive', (req, res, next) => {

    res.json('Ready. Set. Demo!')

  })


  return router

}


module.exports = Sys
