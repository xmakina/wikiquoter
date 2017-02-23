var config = require('./config.js')
var Client = require('node-rest-client').Client
var client = new Client()

function capitalizeString (input) {
  var inputArray = input.split(' ')
  var output = []
  for (s in inputArray) {
    output.push(inputArray[s].charAt(0).toUpperCase() + inputArray[s].slice(1))
  }
  return output.join(' ')
}

module.exports = function (showName, handleSuccess, handleError) {
  showName = capitalizeString(showName)

  var args = { parameters: {
      format: 'json',
      action: 'query',
      redirects: '',
      titles: showName
  }}

  client.get(config.API_URL, args, function (data, response) {
    var pages = data.query.pages
    var pageId = -1
    for (var p in pages) {
      var page = pages[p]
      // api can return invalid recrods, these are marked as "missing"
      if (!('missing' in page)) {
        pageId = page.pageid
        break
      }
    }
    if (pageId > 0) {
      handleSuccess(pageId)
    } else {
      handleError('No results')
    }
  })
}
