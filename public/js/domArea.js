const htmlEditor = document.getElementById("htmlArea");
const domRender = document.getElementById("renderedDOM");
const resetDOM = document.getElementById("reset-DOM");
let data;

resetDOM.addEventListener("click", () => {
    domRender.innerHTML = data;
});

function setUpArea() {
    var http = new XMLHttpRequest();
    http.open("GET", "/htmlfile");
    http.onload = function() {
        data = http.responseText;
        domRender.innerHTML = data;
        htmlEditor.value = data;
        setUpCodeMirror();
    }

    http.send();

}

function setUpCodeMirror() {
    var htmlCodeMirror = CodeMirror.fromTextArea(htmlEditor, {
        mode: "application/xml",
        htmlMode: true,
        lineNumbers: true,
        lineWrapping: true,
        readOnly: true
      });

}

setUpArea();