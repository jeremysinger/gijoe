//GET THE TUTORIAL FILE

const forwardButton = document.getElementById("tutorialForward");
const backButton = document.getElementById("tutorialBack");
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

function getTutorial(id) {
    const settings = JSON.parse(tutorialSettings);
    console.log(settings);
    const http = new XMLHttpRequest();
    http.open("GET", `/tutorial/${id}`);

    http.onload = function() {
        
        if (http.status === 200) {
            console.log(http.responseText);
            let data = http.responseText;
            tutorialSpace.innerHTML = data;
            let steps =  data.steps;
            let i = 1;
            
            forwardButton.addEventListener("click", () => {
                if(backButton.disabled) {
                    backButton.disabled = false;
                }
                let tutorialText = steps.slice(0, i+1).join("//NEXT");
                tutorialText = tutorialText.replace(new RegExp("//NEXT", "g"), "");
                tutorialCodeMirror.setValue(tutorialText);
                i++;
                if (i == steps.length) {
                    forwardButton.disabled = true;
                }
            });

            backButton.addEventListener("click", () => {
                if (forwardButton.disabled) {
                    forwardButton.disabled = false;
                }
                let tutorialText = steps.slice(0, i - 1).join("//NEXT");
                tutorialText = tutorialText.replace(new RegExp("//NEXT", "g"), "");
                tutorialCodeMirror.setValue(tutorialText);
                i--;
                if (i == 0) {
                    backButton.disabled = true;
                }
            });

        } else {
            console.log("DATA NOT FOUND");
        }

    }

    http.send();
}

checkSettings();
