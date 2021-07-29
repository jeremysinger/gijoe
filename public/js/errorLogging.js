let oldAlert = alert;

let output = document.getElementById("output");

function alert(message) {
    message = message.split("\n");
    message = message.join("<br></br>");
    output.innerHTML = `<font color='red'>${message}</font>`;
}