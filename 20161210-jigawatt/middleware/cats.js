const R   = require('ramda')
const got = require('got')


// from elm docs
const BASE_URL = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='

const CAT_URL = 'http://thecatapi.com/api/images/get?format=html&type=gif'

// add must be calico here



const hello = {

  transform: () => "hello world"

}


const isCat = R.pathEq(['params', 'topic'], 'cat')


const getCat = {

  io: (req, data) => ({
    cat: got(CAT_URL).then(R.prop('body'))
  })

, transform: (req, data) => data.cat
}


const get = {

  awesomize: (v) => ({

    topic: {

      read: (req) => req.params.topic
    , sanitize: [ R.when(R.identity, R.toLower) ]
    , validate: [ v.required ]
    , normalize: [ R.when(R.identity, R.trim) ]
    }

  })


, io: (req, data) => ({
    giphy: got(BASE_URL + data.topic).then(R.prop('body'))
  })


, transform: (req, data) => R.compose(
    (x) => `<img src="${x.image_original_url}" />`
  , R.prop('data')
  , JSON.parse
  , R.prop('giphy')
  )(data)
}



module.exports = { hello, get, isCat, getCat }
