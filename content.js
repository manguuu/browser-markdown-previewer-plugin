/*$(document).ready(function () {
    $("p").click(function () {
        $(this).hide();
    });
});*/
var tooltip = '<div id="box">' +
    '<p id="textbox">hihi</p>' +
    '</div>';

$(document.body).append(tooltip);

$(document).on("selectionchange", function (e) {
    console.log("selectionchange");
    console.log("## SELECTION ###############");

    var selection = window.getSelection();
    var focus = (selection.focusNode instanceof Text ? selection.getRangeAt(0) : selection.focusNode).getBoundingClientRect();
    var top = focus.top;
    var left = focus.left;
    console.log("##focusNode: ##");
    console.log("focus.left: ");
    console.log(focus.left);
    console.log("focus.right: ");
    console.log(focus.right);
    console.log("focus.top: ");
    console.log(focus.top);
    console.log("focus.bottom: ");
    console.log(focus.bottom);

    
    document.getElementById("box").style.position = 'absolute';
    document.getElementById("box").style.top = focus.top +20 +"px";
    document.getElementById("box").style.left = focus.left + "px";
    document.getElementById("textbox").innerHTML = selection.toString();
    document.getElementById("box").style.zIndex = 2147483650;
    document.getElementById("box").style.boxShadow = "rgba(0, 0, 0, 0.2) 0px 1px 3px";
    document.getElementById("box").style.backgroundColor = "red";
    document.getElementById("textbox").style.userSelect = "none";
});