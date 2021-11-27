function getword(info, tab) {
    chrome.tabs.sendMessage(tab.id, {selected: info.selectionText}, function(response) {});
    chrome.extension.getBackgroundPage().console.log(info.selectionText);
}
chrome.contextMenus.create({
  title: "Your Md Previewer: %s", 
  contexts:["selection"],
  onclick: getword
});

