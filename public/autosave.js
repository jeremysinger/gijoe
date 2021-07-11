/*
Autosave feature for the gijoe repo. For now I'm gonna make use of the localStorage function
before I understand where the data will be going. I assume that there will be a database
somewhere that we can use in order.
*/

setInterval(autosave, 2000);
var codeArea = document.getElementById("textareacode");
myCodeMirror.setValue(localStorage.getItem("code"));

function autosave() {
    var codeFragment = myCodeMirror.getValue();
    localStorage.setItem("code", codeFragment);
    const http = new XMLHttpRequest();
    http.open("POST", "/autosave");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({code: codeFragment }));
    http.onload = function() {
        console.log(http.responseText);
    }

    
}