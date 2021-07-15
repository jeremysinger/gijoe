//GET THE TUTORIAL FILE

const forwardButton = document.getElementById("tutorialForward");
const backButton = document.getElementById("tutorialBack");


function getTutorial(id) {
    const http = new XMLHttpRequest();
    http.open("GET", `/tutorial/${id}`);

    http.onload = function() {
        
        if (http.status === 200) {
            let data = JSON.parse(http.responseText);
            let steps =  data.steps;
            tutorialCodeMirror.setValue(steps[0]);
            let i = 1;
            
            forwardButton.addEventListener("click", () => {
                if(backButton.disabled) {
                    backButton.disabled = false;
                }
                const tutorialText = steps.slice(0, i+1).join("//NEXT");
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
                const tutorialText = steps.slice(0, i - 1).join("//NEXT");
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

getTutorial(1);
