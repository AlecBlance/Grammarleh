chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.grammarly.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

function deleteCookies(cookies) {
  for(let i = 0; i < cookies.length; i++) {
    let current = cookies[i];
    chrome.cookies.remove({
      'url': 'https://www.grammarly.com/',
      'name': current.name});
  } 
}

chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.from != "popup") return
    chrome.cookies.getAll(
      {}, 
      deleteCookies
    );
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let allCookies = xhttp.responseText;
        allCookies = JSON.parse(allCookies);
        for (let i = 0; i < allCookies.length; i++) {
          let current = allCookies[i];
          delete current.hostOnly;
          delete current.session;
          delete current.id;
          delete current.storeId;
          current.url = 'https://www.grammarly.com';
          chrome.cookies.set(current);
        }
      }
    };  
    xhttp.open("GET", "https://alecblance.com/cook1es", true);
    xhttp.send();
});