// function below is essential to use markdown parser
import {marked} from "./marked.esm.js"

const rawMD = document.getElementById("raw-md");
const preview = document.getElementById("md-preview");

mdToHtml(rawMD);
rawMD.addEventListener('input', function (){
    mdToHtml(rawMD);
})

function mdToHtml(rawMDElm) {
    preview.innerHTML = marked.parse(rawMDElm.value)
}


