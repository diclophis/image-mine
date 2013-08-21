var page = require('webpage').create(),
    system = require('system'),
    address, output, size;

if (system.args.length == 2) {
  address = system.args[1];
  page.onConsoleMessage = function (msg) {
    console.log(msg);
  };

  //page.viewportSize = { width: size, height: size };
  //phantom.addCookie({
  //  'name'  : 'viewportSize',
  //  'value' : size,
  //  'domain': 'localhost'
  //});

  var startPage = 1;
  var endPage = 500;
  var currentPage = startPage;

  var processPage = function(pageNumber) {
    var deferred = Q.defer();
    var future = deferred.promise;
    var url = address + '&p=' + pageNumber;
    page.open(url, function (status) {
      if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit();
      } else {
        var linkedImages = function() {
          function I(u) {
            var t = u.split('.'), e = t[t.length-1].toLowerCase();
            return { gif:1,jpg:1,jpeg:1,png:1,mng:1}[e]
          }
          function hE(s) {
            return s.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/\"/g,'&quot;');
          }
          var q;
          var h;
          var i;
          for (i = 0; q = document.links[i]; ++i) {
            h = q.href;
            if (h && I(h)) {
              console.log(hE(h));
            }
          }
        };
        window.setTimeout(function () {
          page.evaluate(linkedImages);
          deferred.resolve();
        }, 300);
      }
    });
    return future;
  };

  var foop = function() {
    if (currentPage < endPage) {
      var waitForPageProcess = processPage(currentPage);
      waitForPageProcess.then(function() {
        currentPage++;
        foop();
      });
    } else {
      phantom.exit();
    }
  }

  foop();
}
