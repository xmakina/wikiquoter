var randomQuote = require('./randomQuote.js')

var WikiQuoter = function WikiQuoter (config) {
  this.randomQuote = function (showName, maxLimit, handleSuccess, handleError) {
    randomQuote(showName, maxLimit, handleSuccess, handleError)
  }
}

module.exports = WikiQuoter
