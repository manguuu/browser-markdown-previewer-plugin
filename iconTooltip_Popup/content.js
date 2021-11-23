
function makePopup(){
    var tooltip = document.createElement("div");
    tooltip.setAttribute(
      "id",
      "box"
    );
    tooltip.innerHTML=`<p id="textbox">`;

    document.body.appendChild(tooltip);
    document.getElementById('box').style.visibility = 'visible';

    var selection = window.getSelection();
    var focus = (selection.focusNode instanceof Text ? selection.getRangeAt(0) : selection.focusNode).getBoundingClientRect();
    var top = focus.top;
    var left = focus.left;

    document.getElementById("box").style.top = focus.top +20 +"px";
    document.getElementById("box").style.left = focus.left + "px";
    document.getElementById("textbox").innerHTML = selection.toString();
}
/** tooltip icon */
var btn = document.createElement("button");
btn.setAttribute(
  "id",
  "btn"
);
document.body.appendChild(btn);
document.getElementById('btn').style.visibility = 'hidden';
document.getElementById("btn").addEventListener("click",makePopup);
btn.innerHTML=`<img src="https://bit.ly/2JASsV0">`

document.addEventListener("mouseup", function (e) {
  var selectedText = document.getSelection().toString();

  if (selectedText.length ) {
    var range = document.getSelection().getRangeAt(0);
    var location = range.getBoundingClientRect();
    var scrollPosition = $(window).scrollTop();
    var Top = scrollPosition + location.top-50 + "px";
    var Left = location.left + location.width / 2 - 50 + "px";
    
    btn.style.transform =
      "translate3d(" + Left + "," + Top + "," + "0px)";
      document.getElementById('btn').style.visibility = 'visible';
  }
  else if(!selectedText.length){
    document.getElementById('btn').style.visibility = 'hidden';
    document.getElementById('box').style.visibility = 'hidden';
  }
});


