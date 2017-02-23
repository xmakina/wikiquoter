module.exports = function (showName, maxLimit, handleSuccess, handleError) {
  var getQuotesForSection = require('./getQuotesForSection')
  var getSectionsForPage = require('./getSectionsForPage')
  var allQuotes = []
  var cheerio = require('cheerio')

  function saveQuotes (quotes, lastQuotes) {
    for (var q in quotes) {
      var $ = cheerio.load(quotes[q])
      var cleaned = $.html()
        .split('<dl>').join('')
        .split('</dl>').join('')
        .split('<dd>').join('')
        .split('</dd>').join('')
      if (cleaned.length <= maxLimit) {
        allQuotes.push(cleaned)
      }
    }

    if (lastQuotes === true) {
      handleSuccess(allQuotes)
    }
  }

  getQuotesForSection(showName, saveQuotes, handleError)
}
