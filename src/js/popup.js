document.addEventListener('DOMContentLoaded', function () {
  const inputText = document.getElementById('input');
  inputText.addEventListener('keyup', function () {
    const outputText = document.getElementById('output');
    outputText.innerHTML = parseMd(inputText.value);
  });    
});

function parseMd(rawMdString) {
    console.log('parse md');
    return marked.parse(rawMdString);
}