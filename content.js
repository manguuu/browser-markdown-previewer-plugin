
var tooltip = document.createElement("div");
tooltip.setAttribute(
    "id",
    'markdown-box'
);

document.body.appendChild(tooltip);
document.getElementById('markdown-box').style.visibility = 'hidden';
tooltip.innerHTML = `<div class="markdown-header">Raw MD</div><p id="original"><div class="markdown-header">Preview</div><p id="parsed">`;

function makePopup(e) {
  
  document.getElementById('markdown-box').style.visibility = 'visible';
  document.getElementById('markdown-btn').style.visibility = 'hidden';
  const selection = window.getSelection();
  const focus = (selection.focusNode instanceof Text ? selection.getRangeAt(0) : selection.focusNode).getBoundingClientRect();
  
  var scrollPosition = $(window).scrollTop();
  document.getElementById('markdown-box').style.top = scrollPosition + focus.top + 20 +"px";
  document.getElementById('markdown-box').style.left = focus.left + "px";

  document.getElementById("original").innerHTML = "<div class='textbox'>" + selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br>') + "</div>";
  const parsed = parseMd(selection.toString());
  document.getElementById("parsed").innerHTML = "<div class='textbox'>" + parsed + "</div>";
  e.stopPropagation();
}
/** tooltip icon */
var btn = document.createElement("button");
btn.setAttribute(
  "id",
  "markdown-btn"
);
document.body.appendChild(btn);
document.getElementById('markdown-btn').style.visibility = 'hidden';
btn.innerHTML = `<img src="https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/205_Markdown-1024.png" height="30" width="30">`

/** tooltip clickevent */
document.getElementById("markdown-box").addEventListener("mousedown", function (e) {
    e.stopPropagation();
});
document.getElementById("markdown-box").addEventListener("mouseup", function (e) {
    e.stopPropagation();
});

/** tooltip icon clickevent */
document.getElementById("markdown-btn").addEventListener("mousedown", function (e) {
    e.stopPropagation();
});
document.getElementById("markdown-btn").addEventListener("mouseup", makePopup);

/** document clickevent*/
document.addEventListener("mousedown", function (e) {
    document.getElementById('markdown-btn').style.visibility = 'hidden';
});
document.addEventListener("mouseup", function (e) {
    setTimeout($.proxy(function () {
        var selectedText = document.getSelection().toString();

        if (selectedText && document.getElementById('markdown-box').style.visibility == 'hidden') {
            let location = document.getSelection().getRangeAt(0).getBoundingClientRect();
            let scrollPosition = $(window).scrollTop();
            let Top = scrollPosition + location.top - 30 + "px";
            let Left = location.left + "px";

            //     var rect = e.target.getBoundingClientRect();
            //   var x = e.clientX - rect.left; //x position within the element.
            //   var y = e.clientY - rect.top;  //y position within the element.
            //       btn.style.top = y + 'px';
            //       btn.style.left = x + 'px';

            btn.style.transform =
                "translate3d(" + Left + "," + Top + "," + "0px)";
            document.getElementById('markdown-btn').style.visibility = 'visible';
        }
        else {
            document.getElementById('markdown-btn').style.visibility = 'hidden';
            if (document.getElementById('markdown-box') !== null) {
                document.getElementById('markdown-box').style.visibility = 'hidden';
            }
        }
    }, this), 0);
});