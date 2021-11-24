# Markdown preview webpage ver.

This is experimental webpage to develop feature of parsing markdown into html for Markdown previewer
project.

## Core takeaway

1. We can't use NodeJS for any Chrome extension because it's for sever-side development, not
   client-side (browser).
2. By inserting code of `md-to-html:21`, we can use the [parser module][1]
   from external source. You can use it from the script without any import statment. 1
   [1]: https://github.com/markedjs/marked

## steps to deploy markdown parser

1. How to use `marked.esm.js`

```js
import {marked} from "./marked.esm"

document.getElementById('content').innerHTML =
    marked.parse('# Marked in the browser\n\nRendered by **marked**.');
```

2. How to use `marked.min.js`  
put the whole text in the `marked.min.js` into the top of script that you want
to use `marked()` function.