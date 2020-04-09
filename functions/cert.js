exports.handler = function(event, context, callback) {
  const axios = require('axios')

  axios
    .get(`https://academy.learnk8s.io${event.path}`)
    .then(response => {
      callback(null, {
        statusCode: 200,
        body: response.data,
      })
    })
    .catch(error => {
      console.log('Error', error)
      callback('Error')
    })
}
