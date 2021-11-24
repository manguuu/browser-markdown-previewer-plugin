/**tooltip */
var tooltip = document.createElement("div");
tooltip.setAttribute(
    "id",
    'markdown-box'
);
tooltip.setAttribute(
    "class",
    "markdown-view"
);
document.body.appendChild(tooltip);
document.getElementById('markdown-box').style.visibility = 'hidden';
tooltip.innerHTML = `<div class="markdown-header">Raw MD</div><p id="original"><div class="markdown-header">Preview</div></pr><p id="parsed">`;

function makePopup() {
  
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
btn.setAttribute(
    "class",
    "markdown-view"
);
document.body.appendChild(btn);
document.getElementById('markdown-btn').style.visibility = 'hidden';
document.getElementById("markdown-btn").addEventListener("click",makePopup);
btn.innerHTML=`<img src="https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/205_Markdown-1024.png" height="30" width="30">`

/** documentclickevent*/

document.addEventListener("mousedown", function (e) {
    if (document.getElementById('markdown-btn').style.visibility == 'visible' && document.getElementById('markdown-box').style.visibility == 'hidden')
        document.getElementById('markdown-btn').style.visibility = 'hidden';
});


document.addEventListener("mouseup", function (e) {
    setTimeout($.proxy(function () {
        var selectedText = document.getSelection().toString();

        if (document.getElementById('markdown-btn').style.visibility == 'hidden' && document.getElementById('markdown-box').style.visibility == 'hidden' && selectedText) {
            var range = document.getSelection().getRangeAt(0);
            var location = range.getBoundingClientRect();
            var scrollPosition = $(window).scrollTop();
            var Top = scrollPosition + location.top - 30 + "px";
            var Left = location.left + "px";

            btn.style.transform =
                "translate3d(" + Left + "," + Top + "," + "0px)";
            document.getElementById('markdown-btn').style.visibility = 'visible';
        }
        else if (!$(e.target).hasClass('markdown-view')) {
            document.getElementById('markdown-btn').style.visibility = 'hidden';
            if (document.getElementById('markdown-box') !== null) {
                document.getElementById('markdown-box').style.visibility = 'hidden';
            }
        }
    }, this), 0);
});

function parseMd(md){
  
  //ul
  md = md.replace(/^\s*\n\*/gm, '<ul>\n*');
  md = md.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
  md = md.replace(/^\*(.+)/gm, '<li>$1</li>');
  
  //ol
  md = md.replace(/^\s*\n\d\./gm, '<ol>\n1.');
  md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
  md = md.replace(/^\d\.(.+)/gm, '<li>$1</li>');
  
  //blockquote
  md = md.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');
  
  //h
  md = md.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>');
  md = md.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>');
  md = md.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>');
  md = md.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>');
  md = md.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
  md = md.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');
  
  //alt h
  md = md.replace(/^(.+)\n\=+/gm, '<h1>$1</h1>');
  md = md.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>');
  
  //images
  md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');
  
  //links
  md = md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4">$1</a>');
  
  //font styles
  md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
  md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');
  md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');
  
  //pre
  md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
  md = md.replace(/^\`\`\`\s*\n/gm, '</pre>\n\n');
  
  //code
  md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');
  
  //p
  md = md.replace(/^\s*(\n)?(.+)/gm, function(m){
    return  /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>'+m+'</p>';
  });
  
  //strip p from pre
  md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, '$1$2');
  
  return md;
  
}
