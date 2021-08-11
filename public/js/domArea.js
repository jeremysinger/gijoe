const htmlEditor = document.getElementById("htmlArea");
const domRender = document.getElementById("renderedDOM");

function setUpArea() {
    var http = new XMLHttpRequest();
    http.open("GET", "/htmlfile", false);
    http.onload = function() {
        var data = http.responseText;
        domRender.innerHTML = data;
        htmlEditor.value = data;
        setUpCodeMirror();
    }

    http.send();

}

function setUpCodeMirror() {
    var htmlCodeMirror = CodeMirror.fromTextArea(htmlEditor, {
        mode:  "html",
        lineNumbers: true,
        lineWrapping: true,
        readOnly: true
      });

}

setUpArea();