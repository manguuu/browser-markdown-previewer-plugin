const HIDDEN = 'none';
const VISIBLE = 'block';
const ICON_IMG = 'images/markdown-previewer.png';

init();

function init() {
    initTooltip();
    initTooltipButton();
    addEventListeners();
    console.log(mrk_btn);
}

function initTooltip() {
    document.body.appendChild(generateTooltip());
    window.mrk_tooltip = document.getElementById('markdown-box');
    mrk_tooltip.style.display = HIDDEN;
}

function initTooltipButton() {
    document.body.appendChild(generateTooltipButton());
    window.mrk_btn = document.getElementById('markdown-btn');
    mrk_btn.style.display = HIDDEN;
    let markdownIconReference = chrome.runtime.getURL(ICON_IMG);
    console.log(markdownIconReference);
    mrk_btn.innerHTML = `<img src="${markdownIconReference}" height="30" width="30" alt="button to markdown" style="cursor:pointer">`;
}

function addEventListeners() {
    document.addEventListener("mousedown", hideTooltip);
    document.addEventListener("mouseup", function (e) {
        renderDisplay(e);
    });
    mrk_tooltip.addEventListener("mousedown", function (e) {
        e.stopPropagation();
    });
    mrk_tooltip.addEventListener("mouseup", function (e) {
        e.stopPropagation();
    });

    mrk_btn.addEventListener("mousedown", function (e) {
        e.stopPropagation();
    });
    mrk_btn.addEventListener("mouseup", visualizePopup);

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            check(request.selected);
            visualizePopupFromBackground(request.selected);
        }
    )
}

function check(s) {
    for (let i = 0; i < s.length; i++) {
        console.log(s.charAt(i));
        console.log(s.charCodeAt(i));
    }
}

function hideTooltip() {
    console.log('Hide tooltip');
    if (getDisplay(mrk_btn) === VISIBLE && getDisplay(mrk_tooltip) === HIDDEN)
        setDisplay(mrk_btn, HIDDEN);
}

function renderDisplay(e) {
    console.log('render display');
    setTimeout($.proxy(function () {
        let selectedText = document.getSelection().toString();

        if (selectedText && getDisplay(mrk_tooltip) === HIDDEN) {
            showButton(e);
        } else {
            setDisplay(mrk_btn, HIDDEN);
            if (mrk_tooltip !== null) {
                setDisplay(mrk_tooltip, HIDDEN);
            }
        }
    }, this), 0);
}


function generateTooltip() {
    let tooltip = document.createElement('div');
    tooltip.setAttribute('id', 'markdown-box');
    tooltip.setAttribute('class', 'markdown-view');
    tooltip.innerHTML =
        '<div class="markdown-header">Raw MD</div>' +
        '<div id = "markdown-original" class="markdown-textbox"></div>' +
        '<div class="markdown-header">Preview</div>' +
        '<div id="markdown-parsed" class="markdown-textbox"></div>';
    return tooltip;
}


function generateTooltipButton() {
    let btn = document.createElement('button');
    btn.setAttribute('id', 'markdown-btn');
    btn.setAttribute('class', 'markdown-view');
    return btn
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function replaceBlank(s) {
    for (let i = 0; i < s.length; i++) {
        if (s.charCodeAt(i) === 160) {
            s = s.replaceAt(i, ' ');
            console.log(s[i]);
        }
    }
    return s;
}

function visualizePopup(e) {
    console.log('POP UPPPPPP!');
    mrk_tooltip.style.display = VISIBLE;
    mrk_btn.style.display = HIDDEN;
    const selection = window.getSelection();
    const focus = (selection.focusNode instanceof Text ? selection.getRangeAt(0) : selection.focusNode).getBoundingClientRect();

    mrk_tooltip.style.top = `${e.pageY + 20}px`;
    mrk_tooltip.style.left = `${focus.left}px`;

    document.getElementById("markdown-original").innerText = selection.toString();
        // .replace(/(?:\r\n|\r|\n)/g, '<br />');
    document.getElementById("markdown-parsed").innerHTML = parseMD(replaceBlank(selection.toString()));
    e.stopPropagation();
}

function visualizePopupFromBackground(selectedText) {
    console.log('FromBackground : PopUp');
    mrk_tooltip.style.display = VISIBLE;
    mrk_btn.style.display = HIDDEN;
    const selection = window.getSelection();
    const focus = (selection.focusNode instanceof Text ? selection.getRangeAt(0) : selection.focusNode).getBoundingClientRect();

    let scrollPosition = document.body.scrollTop;
    mrk_tooltip.style.top = `${scrollPosition + focus.top + 20}px`;
    mrk_tooltip.style.left = `${focus.left}px`;
    // for (let i = 0; i < selectionString.length; i++) {
    //     console.log(selectionString.charCodeAt(i));
    // }
    document.getElementById("markdown-original").innerHTML = selectedText.replace(/(?:\r\n|\r|\n)/g, '<br />');
    document.getElementById("markdown-parsed").innerHTML = parseMD(replaceBlank(selectedText));
}

function getDisplay(element) {
    return element.style.display;
}

function setDisplay(element, display) {
    element.style.display = display;
}

function showButton(e) {
    console.log('show button');

    const boxTop = `${e.pageY - 30}px`;
    const boxLeft = `${e.pageX}px`;

    mrk_btn.style.transform = "translate3d(" + boxLeft + "," + boxTop + "," + "0px)";
    setDisplay(mrk_btn, VISIBLE);
}



function parseMD(rawMDString) {
    console.log('parse md');
    return marked.parse(rawMDString);
}
