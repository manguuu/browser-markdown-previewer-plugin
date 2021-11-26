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
    mrk_tooltip.style.visibility = 'hidden';
}

function initTooltipButton() {
    document.body.appendChild(generateTooltipButton());
    window.mrk_btn = document.getElementById('markdown-btn');
    mrk_btn.style.visibility = 'hidden';
    let markdownIconReference = chrome.runtime.getURL("images/markdown-icon.png");
    console.log(markdownIconReference);
    mrk_btn.innerHTML="<img src='" + markdownIconReference +
        "' height='30' width='30' alt='button to markdown'>";
}

function addEventListeners() {
    document.addEventListener('mousedown', hideTooltip);
    document.addEventListener('mouseup', renderDisplay);
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
        function(request, sender, sendResponse) {
            visualizePopup(mrk_btn)
        }
    )
}


function hideTooltip() {
    console.log('Hide tooltip');
        if (getVisibility(mrk_btn) === 'visible' && getVisibility(mrk_tooltip) === 'hidden')
            setVisibility(mrk_btn, 'hidden');
}

function renderDisplay() {
    console.log('render display');
        setTimeout($.proxy(function () {
            let selectedText = document.getSelection().toString();

            if (selectedText && getVisibility(mrk_tooltip) === 'hidden') {
                showButton();
            } else {
                setVisibility(mrk_btn, 'hidden');
                if (mrk_tooltip !== null) {
                    setVisibility(mrk_tooltip, 'hidden');
                }
            }
        }, this), 0);
}


function generateTooltip() {
    let tooltip = document.createElement('div');
    tooltip.setAttribute('id', 'markdown-box');
    tooltip.setAttribute('class', 'markdown-view');
    tooltip.innerHTML = `<div class="markdown-header">Raw MD</div><p id="original" class="textbox"><div class="markdown-header">Preview</div><p id="parsed" class="textbox">`;
    return tooltip
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

function replaceBlack(s) {
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
    mrk_tooltip.style.visibility = 'visible';
    mrk_btn.style.visibility = 'hidden';
    const selection = window.getSelection();
    const focus = (selection.focusNode instanceof Text ? selection.getRangeAt(0) : selection.focusNode).getBoundingClientRect();

    let scrollPosition = $(window).scrollTop();
    mrk_tooltip.style.top = `${scrollPosition + focus.top + 20}px`;
    mrk_tooltip.style.left = `${focus.left}px`;
    // for (let i = 0; i < selectionString.length; i++) {
    //     console.log(selectionString.charCodeAt(i));
    // }
    document.getElementById("original").innerHTML = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />');
    document.getElementById("parsed").innerHTML = parseMd(replaceBlack(selection.toString()));
    e.stopPropagation();
}


function getVisibility(element) {
    return element.style.visibility;
}

function setVisibility(element, visibility) {
    element.style.visibility = visibility;
}

function showButton() {
    console.log('show button');

    let location = document.getSelection().getRangeAt(0).getBoundingClientRect();
    let scrollPosition = $(window).scrollTop();
    let boxTop = `${scrollPosition + location.top - 30}px`;
    let boxLeft = `${location.left}px`;

    mrk_btn.style.transform = "translate3d(" + boxLeft + "," + boxTop + "," + "0px)";
    setVisibility(mrk_btn, 'visible');
}



function parseMd(rawMdString) {
    console.log('parse md');
    return marked.parse(rawMdString);
}