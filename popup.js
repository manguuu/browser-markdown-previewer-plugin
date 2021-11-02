function selectText() {
                var selectionText = "";
                if (document.getSelection) {
                    selectionText = document.getSelection();
                } else if (document.selection) {
                    selectionText = document.selection.createRange().text;
                }
                return selectionText;
}
           
document.onmouseup = function() {
                document.getElementById("console").innerHTML = selectText();
}
window.onload = selectText();