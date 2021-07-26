//GET THE TUTORIAL FILE

const forwardButton = document.getElementById("tutorialForward");
const backButton = document.getElementById("tutorialBack");
backButton.disabled = true;
const tutorialArea = document.getElementById("tutorialArea");
const tutorialSpace = document.getElementById("tutorialSpace");

//Parse the settings json file to see whether the tutorial settings were on
function checkSettings() {
    const settings = JSON.parse(tutorialSettings);
    if (settings.tutorial) {
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
    const settings = JSON.parse(tutorialSettings);
    const http = new XMLHttpRequest();
    http.open("GET", `/tutorial/${id}`);

    http.onload = function() {
        
        if (http.status === 200) {
            let data = http.responseText;
            tutorialSpace.innerHTML = data;
            //makeCodeMirrorInstances();
            hljs.highlightAll();
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



/*This code tries to create brand new Code Mirror elements. For some reason it
crashes the website so I'm commenting it out before I commit this 

function createNewMirror(selector) {
    console.log(selector.classList[0]);
    return CodeMirror.fromTextArea(selector, {
        mode: selector.classList[0],
        readOnly: true,
        lineNumbers: false,
        lineWrapping: true
    });

}


function makeCodeMirrorInstances() {
    const preElements = tutorialSpace.getElementsByTagName("pre");
    codeMirrors = [];
    for (var i = 0; i < preElements.length; i++) {
        var codeBlock = preElements[i].childNodes[0];
        console.log(codeBlock);
        var newTextArea = document.createElement("textarea");
        newTextArea.classList = codeBlock.classList;
        newTextArea.value = codeBlock.innerHTML;
        console.log(preElements[i].parentNode);
        preElements[i].parentNode.replaceChild(newTextArea, preElements[i]);
        codeMirrors.push(createNewMirror(newTextArea));
    }
    console.log(preElements);
}

*/

checkSettings();
