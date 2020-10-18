let login = document.getElementById('login');

function reload() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'location.reload();'});
    });
}

login.onclick = function() {
    chrome.runtime.sendMessage({from: "popup"});
    setTimeout(reload, 2100);
};
