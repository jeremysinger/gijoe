//GET THE TUTORIAL FILE

const forwardButton = document.getElementById("tutorialForward");
const backButton = document.getElementById("tutorialBack");
backButton.disabled = true;
const tutorialArea = document.getElementById("tutorialArea");
const tutorialSpace = document.getElementById("tutorialSpace");

//Parse the settings json file to see whether the tutorial settings were on
function checkSettings() {
    console.log(tutorialSettings);
    if (tutorialSettings.tutorial) {
        getTutorial(1);
        tutorialArea.style.display = "block";
    } else {
        tutorialArea.style.display = "none";
    }
}

forwardButton.addEventListener("click", () => {
    if(backButton.disabled) {
        backButton.disabled = false;
    }
    currentFile++;
    getTutorial(currentFile);
    updateCodeMirror(currentFile);
    if (currentFile === tutorialFiles) {
        forwardButton.disabled = true;
    }
});

backButton.addEventListener("click", () => {
    if (forwardButton.disabled) {
        forwardButton.disabled = false;
    }
    currentFile--;
    getTutorial(currentFile);
    updateCodeMirror(currentFile);    
    if (currentFile === 1) {
        backButton.disabled = true;
    }
});

function getTutorial(id) {
    const http = new XMLHttpRequest();
    http.open("GET", `/tutorial/${id}`);

    http.onload = function() {
        
        if (http.status === 200) {
            let data = http.responseText;
            tutorialSpace.innerHTML = data;
            makeCodeMirrorInstances();
            //hljs.highlightAll();
        } else {
            console.log("DATA NOT FOUND");
        }

    }

    http.send();
}

function updateCodeMirror(id) {
    const http = new XMLHttpRequest();
    http.open("GET", `/savefile/${id}`);

    http.onload = function() {
        if (http.status === 200) {
            const data = JSON.parse(http.responseText);
            myCodeMirror.setValue(data.code);
        } else {
            console.log("DATA NOT FOUND");
        }
    }

    http.send();
}

function makeCodeMirrorInstances() {
    const preElements = tutorialSpace.getElementsByTagName("pre");
    codeMirrors = [];
    for (var i = 0; i < preElements.length; i++) {
        var codeBlock = preElements[i].childNodes[0];
        preElements[i].classList.add("example");
        CodeMirror.runMode(codeBlock.innerHTML, "text/javascript", preElements[i]);
    }
}

function resizeCodeMirror() {
    if (codeMirrorEl.offsetTop == tutorialSpace.offsetTop) {
        var height = tutorialSpace.style.height;
        var width = myCodeMirror.getWrapperElement().offsetWidth;
        myCodeMirror.setSize(width, height);
    }
}

function resizeTutorialArea() {
    console.log("CODE MIRROR RESIZE");
    if (codeMirrorEl.offsetTop == tutorialSpace.offsetTop) {
        var width = tutorialSpace.style.width;
        var newHeight = myCodeMirror.getWrapperElement().offsetHeight;
        tutorialSpace.style.height = newHeight;
    }
}

new ResizeObserver(resizeCodeMirror).observe(tutorialSpace);

const codeResize = new ResizeObserver(resizeTutorialArea);
const codeMirrorEl = document.querySelector("div.CodeMirror.CodeMirror-wrap");
codeResize.observe(codeMirrorEl);



checkSettings();
