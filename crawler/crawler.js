var bsService = new BSAutoSwitch(['elkanacmmmdgbnhdjopfdeafchmhecbf'])
var extractedDataArray = []

function addMetadata(err, extractedData) {
  // Set metadata in easy to type var . . .
  extractedData = extractedData.metadata.newegg_product

  var data = {}
  // Set newegg specific information
  data.neweggUrl = extractedData.location

  // Set product specific information
  data.thumbnail = extractedData.favicon.location
  extractedData.specifications_table.forEach(function (d, i) {
    d.specifications.forEach(function (f, j) {
      var key = f.name.split(' ').join('_')
      var value = f.value

      data[key] = value
    })
  })

  extractedDataArray.push(data)
}

function extract(url) {
  var extractionContainer = document.getElementById('extraction')
  var notice = document.createElement('div')
  notice.innerHTML = 'extracting ' + url
  extractionContainer.appendChild(notice)

  bsService.loadMetadata(url, {}, addMetadata)

  httpGetAsync(url, function (text) {
    console.log(text)
  })
}

function httpGetAsync(url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", url, true)
  xhr.onload = function() {
    callback(xhr.responseText)
  }
  xhr.send()
}

function bsServiceIsReady() {
  setTimeout(function () {
    if (bsService.ready) {
      extract('http://www.newegg.com/Product/Product.aspx?Item=N82E16834232776')
    } else {
      bsServiceIsReady()
    }
  }, 10)
}

window.onload = bsServiceIsReady
