"use strict";
function initSDK(apiKey) {
    if (window.TranslateSDK)
        return;
    window.TranslateSDK = (function () {
        let globalIndex = 0;
        let bodyHTML = document.body.innerHTML;
        let newHTML = '';
        let isText = 0;
        let word = '';
        let isWordComplete = false;
        //TODO: Some words are not being wrapped correctly as they lack the first character. This behavior always repeats inside anchor tags
        for (let i = 0; i < bodyHTML.length; i++) {
            const c = bodyHTML[i];
            if (c === '<' || c === ' ') {
                isWordComplete = true;
            }
            if (isText === 0 && isWordComplete) {
                newHTML += ((word[0] !== '&') && word.length > 1)
                    ? wrapWord(word)
                    : word;
                newHTML += c;
                isWordComplete = false;
                word = '';
            }
            else if (isText === 0) {
                word += c;
            }
            else {
                newHTML += c;
            }
            if (c === '<') {
                isText++;
            }
            else if (c === '>') {
                isText--;
            }
        }
        document.body.innerHTML = newHTML;
        function wrapWord(word) {
            return `<span class="translateSDKWord" data-translate-index="${globalIndex++}">${word}</span>`;
        }
        function init() {
            window.addEventListener('click', (ev) => {
                const sheet = new CSSStyleSheet();
                sheet.replaceSync('.translateSDKWord:hover { background-color: lightgreen; cursor: pointer; }');
                document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
            });
        }
        init();
        return {};
    })();
}
