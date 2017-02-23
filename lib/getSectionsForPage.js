var config = require('./config.js')
var Client = require('node-rest-client').Client
var getShow = require('./getShow')
var client = new Client()

module.exports = function (showName, handleSuccess, handleError) {
  getShow(showName, function (pageId) {
    var args = { parameters: {
        format: 'json',
        action: 'parse',
        prop: 'sections',
        pageid: pageId
    }}

    client.get(config.API_URL, args, function (result, response) {
      var sectionArray = []
      var sections = result.parse.sections

      for (var s in sections) {
        var splitNum = sections[s].number.split('.')
        if (splitNum.length > 1) {
          sectionArray.push(sections[s].index)
        }
      }

      // Use section 1 if there are no "1.x" sections
      if (sectionArray.length === 0) {
        sectionArray.push('1')
      }

      handleSuccess(sections, pageId)
    })
  })
}
