function getword(info, tab) {
  chrome.extension.getBackgroundPage().console.log(info.selectionText);
  // chrome.extension.getBackgroundPage().console.log(s);
}
chrome.contextMenus.create({
  title: "Your Md Previewer: %s", 
  contexts:["selection"],
  onclick: getword
});