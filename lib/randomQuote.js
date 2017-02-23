module.exports = function (showName, maxLimit, handleSuccess, handleError) {
  var getQuotes = require('./getQuotes')

  function selectRandomQuote (allQuotes) {
    if (allQuotes.length === 0) {
      handleError('no quotes found')
    }

    var randomNum = Math.floor(Math.random() * allQuotes.length)
    var quote = allQuotes[randomNum]

    if (quote === null || quote.length > maxLimit) {
      return selectRandomQuote(allQuotes)
    }

    handleSuccess(quote)
  }

  getQuotes(showName, maxLimit, selectRandomQuote, handleError)
}
