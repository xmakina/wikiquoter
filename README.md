# wikiquoter
NodeJS implementation of wikiquotes-api to get random wikiquote

## usage
    var Wikiquoter = require('wikiquoter')
    var wq = new Wikiquoter()
    // show name, maximum quote length (includes html tags), successCallback(quote), errorCallback(err)
    wq.randomQuote('steven universe', 240, successCallback, errorCallback)
