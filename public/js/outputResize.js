const codeOutput = document.getElementById("fakeConsole");
const consoleOutput = document.getElementById("output");
const outputBlock = document.getElementById("outputblock");
const outputWrap = document.getElementById("outputwrap");

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
    console.log($(document).width());
    if (!tutorialSettings.libraries.turtle && !tutorialSettings.libraries.DOM && !tutorialSettings.libraries.csv && !tutorialSettings.libraries.csvAndTurtle) {
        outputBlock.style.paddingLeft = "40px";
    } 
    else {
        if($(document).width() < 1191){
            outputBlock.style.paddingLeft = "40px";
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function outputSuccess() {
    outputWrap.style.transitionDuration = "0.3s";
    // codeOutput.style.transitionDuration = "0.3s";
    outputWrap.style.backgroundColor = "rgb(0, 140, 255)";
    // codeOutput.classList.add("successTransition");
    outputArea.style.display = "none";
    sleep(300).then(function () {
        // outputWrap.classList.remove("successTransition");
        outputWrap.style.backgroundColor = "azure";
        // codeOutput.classList.remove("successTransition");
    });
}

new ResizeObserver(resizeCodeOutput).observe(consoleOutput);
new ResizeObserver(resizeConsoleOutput).observe(codeOutput);
outputPaddingAdjuster();