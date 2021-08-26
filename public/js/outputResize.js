const codeOutput = document.getElementById("fakeConsole");
const consoleOutput = document.getElementById("output");
const outputBlock = document.getElementById("outputblock")

function resizeCodeOutput() {
    var new_height = consoleOutput.style.height;
    codeOutput.style.height = new_height;
}

function resizeConsoleOutput() {
    var new_height = codeOutput.style.height;
    consoleOutput.style.height = new_height;
}

/**If the settings make it so that there is no extra info alongside the console, have the console still look nice
 * and have extra padding on the left
 */
function outputPaddingAdjuster() {
    if (!tutorialSettings.libraries.turtle && !tutorialSettings.libraries.DOM && !tutorialSettings.libraries.csv && !tutorialSettings.libraries.csvAndTurtle) {
        outputBlock.style.paddingLeft = "40px";
    } 
}

new ResizeObserver(resizeCodeOutput).observe(consoleOutput);
new ResizeObserver(resizeConsoleOutput).observe(codeOutput);
outputPaddingAdjuster()