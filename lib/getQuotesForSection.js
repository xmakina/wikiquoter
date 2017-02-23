module.exports = function (showName, handleSuccess, handleError) {
  var getSectionsForPage = require('./getSectionsForPage')
  var config = require('./config.js')
  var Client = require('node-rest-client').Client
  var client = new Client()

  function loadSections (sections, pageId) {
    var requests = []

    for (var s in sections) {
      var args = { parameters: {
          format: 'json',
          action: 'parse',
          noimages: '',
          pageid: pageId,
          section: sections[s].index
      }}

      var request = client.get(config.API_URL, args, function (result, response) {
        requests.pop()
        var done = false
        if (requests.length === 0) {
          done = true
        }

        var cheerio = require('cheerio')
        var $ = cheerio.load(result.parse.text['*'])
        var quotes = $('dl')

        if (quotes != null) {
          handleSuccess(quotes.toArray(), done)
        }
      })

      requests.push(request)
    }
  }

  getSectionsForPage(showName, loadSections)
}
