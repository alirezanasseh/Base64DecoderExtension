function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    try {
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    } catch (e) {
        console.log(e);
        return ("This is not a Base64!");
    }
}

function onClickHandler(info, tab) {
    prompt("Decoded string", b64DecodeUnicode(info.selectionText))
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
    var context = "selection";
    var title = "Base64 Decode Selection";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});
});
