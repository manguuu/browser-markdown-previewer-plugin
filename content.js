function makePopup() {
  var tooltip = document.createElement("div");
  tooltip.setAttribute(
    "id",
    'markdown-box'
  );
  tooltip.innerHTML=`<div class="markdown-header">Raw MD</div><p id="original"><div class="markdown-header">Preview</div></pr><p id="parsed">`;

  document.body.appendChild(tooltip);
  document.getElementById('markdown-box').style.visibility = 'visible';
  document.getElementById('markdown-btn').style.visibility = 'hidden';
  const selection = window.getSelection();
  const focus = (selection.focusNode instanceof Text ? selection.getRangeAt(0) : selection.focusNode).getBoundingClientRect();
  
  var scrollPosition = $(window).scrollTop();
  document.getElementById('markdown-box').style.top = scrollPosition + focus.top + 20 +"px";
  document.getElementById('markdown-box').style.left = focus.left + "px";

  document.getElementById("original").innerHTML = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />');
  const parsed = parseMd(selection.toString());
  document.getElementById("parsed").innerHTML = parsed;
}
/** tooltip icon */
var btn = document.createElement("button");
btn.setAttribute(
  "id",
  "markdown-btn"
);
document.body.appendChild(btn);
document.getElementById('markdown-btn').style.visibility = 'hidden';
document.getElementById("markdown-btn").addEventListener("click",makePopup);
btn.innerHTML=`<img src="https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/205_Markdown-1024.png" height="30" width="30">`

document.addEventListener("mouseup", function (e) {
  var selectedText = document.getSelection().toString();

  if (selectedText.length ) {
    var range = document.getSelection().getRangeAt(0);
    var location = range.getBoundingClientRect();
    var scrollPosition = $(window).scrollTop();
    var Top = scrollPosition + location.top - 30 + "px";
    var Left = location.left + "px";
    
    btn.style.transform =
      "translate3d(" + Left + "," + Top + "," + "0px)";
      document.getElementById('markdown-btn').style.visibility = 'visible';
  }
  else if (!selectedText.length) {
    document.getElementById('markdown-btn').style.visibility = 'hidden';
    if (document.getElementById('markdown-box') !== null) {
      document.getElementById('markdown-box').style.visibility = 'hidden';
    }
  }
});