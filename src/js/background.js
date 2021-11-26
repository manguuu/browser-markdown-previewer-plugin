function getword(info, tab) {
    chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {});
    chrome.extension.getBackgroundPage().console.log(info.selectionText);
}
chrome.contextMenus.create({
  title: "Your Md Previewer: %s", 
  contexts:["selection"],
  onclick: getword
});

