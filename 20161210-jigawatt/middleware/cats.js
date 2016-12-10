const R   = require('ramda')
const got = require('got')


// from elm docs
const BASE_URL = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='

// add must be calico here



const hello = {

  transform: () => "hello world"

}


const get = {

  awesomize: (v) => ({

    topic: {

      read: (req) => req.params.topic
    , saitize: [ R.when(R.identity, R.toLower) ]
    , validate: [ v.required ]
    , normalize: [ R.when(R.identity, R.trim) ]
    }

  })


, io: (req, data) => ({
    giphy: got(BASE_URL + data.topic).then(R.prop('body'))
  })


, transform: (req, data) => R.compose(
    R.prop('data')
  , JSON.parse
  , R.prop('giphy')
  )(data)
}



module.exports = { hello, get }
