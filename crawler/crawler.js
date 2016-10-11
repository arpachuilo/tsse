var bsService = new BSAutoSwitch(['elkanacmmmdgbnhdjopfdeafchmhecbf'])
var extractedDataArray = []

// Below obtained with the following commands . . .
// var arr = $x("//a[contains(@class, 'item-title') and not(contains(@class, 'main-nav-item-title'))]")
// var xs = []
// arr.forEach(function(d) {xs.push(d.href)})
var neweggLinks = ['http://www.newegg.com/Product/Product.aspx?Item=N82E16834232776', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834298766', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834321418', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834232793', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834315303', 'http://www.newegg.com/Product/Product.aspx?Item=9SIA4P03N50962', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834315130', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834266056', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834315422', 'http://www.newegg.com/Product/Product.aspx?Item=1TS-001A-002P7', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834331907', 'http://www.newegg.com/Product/Product.aspx?Item=1TS-000E-05701', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834890015', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834234176', 'http://www.newegg.com/Product/Product.aspx?Item=1TS-000E-04MH5', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834234023', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834154240', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834266058', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834154241', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834319886', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834154111', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834266057', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834331543', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834315421', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834266510', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834315446', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834315445', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834331910', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834331902', 'http://www.newegg.com/Product/Product.aspx?Item=9SIABMT4F97877', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834321405', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834265955', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834297343', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834298771', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834297405', 'http://www.newegg.com/Product/Product.aspx?Item=N82E16834154262']

function addMetadata(err, extractedData) {
  // Set metadata in easy to type var . . .
  extractedData = extractedData.metadata.newegg_product

  // Mangling and cleaning through for what we want here
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
  extractionLoop()
}

function extract(url) {
  var extractionContainer = document.getElementById('extraction')
  var notice = document.createElement('div')
  notice.innerHTML = 'extracting ' + url
  extractionContainer.appendChild(notice)

  bsService.loadMetadata(url, {}, addMetadata)
}

var i = 0
function extractionLoop () {
  if (i < neweggLinks.length) {
    extract(neweggLinks[i])
    i++
  } else {
    console.log(extractedDataArray)
    var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(extractedDataArray, null, '  '))
    var dlAnchorElem = document.getElementById('downloadAnchorElem')
    dlAnchorElem.setAttribute('href', dataStr)
    dlAnchorElem.setAttribute('download', 'data.json')
    dlAnchorElem.click()
  }
}

function bsServiceIsReady() {
  setTimeout(function () {
    if (bsService.ready) {
      extractionLoop()
    } else {
      bsServiceIsReady()
    }
  }, 10)
}

window.onload = bsServiceIsReady
