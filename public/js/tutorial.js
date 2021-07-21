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
    if (currentFile === 1) {
        backButton.disabled = true;
    }
});

function getTutorial(id) {
    const settings = JSON.parse(tutorialSettings);
    console.log(settings);
    console.log(`Tutorial file is ${currentFile}`);
    const http = new XMLHttpRequest();
    http.open("GET", `/tutorial/${id}`);

    http.onload = function() {
        
        if (http.status === 200) {
            console.log(http.responseText);
            let data = http.responseText;
            tutorialSpace.innerHTML = data;
        } else {
            console.log("DATA NOT FOUND");
        }

    }

    http.send();
}

checkSettings();
