const codeOutput = document.getElementById("fakeConsole");
const consoleOutput = document.getElementById("output");

function resizeCodeOutput() {
    var new_height = consoleOutput.style.height;
    codeOutput.style.height = new_height;
}

function resizeConsoleOutput() {
    var new_height = codeOutput.style.height;
    consoleOutput.style.height = new_height;
}

new ResizeObserver(resizeCodeOutput).observe(consoleOutput);
new ResizeObserver(resizeConsoleOutput).observe(codeOutput);