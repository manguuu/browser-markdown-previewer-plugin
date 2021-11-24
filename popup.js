
document.addEventListener('DOMContentLoaded', function () {
    chrome.extension.getBackgroundPage().console.log('input');
    let inputText = document.getElementById('input');
    inputText.addEventListener('keyup', function () {
        let outputText = document.getElementById('output');
        outputText.innerHTML = parseMd(inputText.value);
    });    
});
