const  Btnprevious  =  document.getElementById('tutorialBack');
const  Btnnext  =  document.getElementById('tutorialForward');
// const  Btnsubmit  =  document.getElementById('Submit');
const pb = document.getElementById("pb");
const progressbar = document.getElementById("pbsection");


let current = 0;
const max = tutorialFiles+1;
/* max is one more the the number of tutorial files, these are 1-indexed */


function updateCurrentButtonTo(newCurrent) {
    // note current and newCurrent are 0-indexed
    if (newCurrent+1>=max) {
        throw new Error("no such tutorial step");
    }
    const bullets = [...document.querySelectorAll('.bullets')];

    if(current != max && (tutorialFiles>2 && tutorialFiles<11)){
        bullets[current].classList.add('completed');

	if (Math.abs(newCurrent-current) == 1) {
	    // consecutive buttons
            let currentX = bullets[current].getBoundingClientRect().left;
            let nextX = bullets[newCurrent].getBoundingClientRect().left;
            let lineWidth = Math.abs(nextX - currentX) - 36;
	    let goingBack = (newCurrent < current);
            // Create a new element to add
            const line = document.createElement("div");
            line.classList.add(goingBack?"emptyline":"line");
            line.style.width = lineWidth + "px";
	    
            // Insert the created element
            bullets[(goingBack?newCurrent:current)].appendChild(line);
	}
        bullets[current].classList.remove('currentstep');
        bullets[newCurrent].classList.add('currentstep');
    }

    current  =  newCurrent;
    currentFile = current+1;  // files are 1-based, buttons are 0-based
    getTutorial(currentFile);
    getInitcode(currentFile);
    updateCodeMirror(currentFile);

    progressBarAlt.innerHTML = `${current+1} / ${tutorialFiles}`;


    // check both buttons, are we at either end of step sequence?
    if (current == max-2) {
	// horrific indexing here! FIXME!
        Btnnext.disabled = true;
    }
    else {
	Btnnext.disabled = false;
    }
    if (current == 0) {
	Btnprevious.disabled = true;
    }
    else {
	Btnprevious.disabled = false;
    }
}

Btnnext.addEventListener('click',  ()  =>  {
    updateCurrentButtonTo(current+1);
});

Btnprevious.addEventListener('click',  ()  =>  {
    updateCurrentButtonTo(current-1);
});

function addPb(){

    if(tutorialFiles<2){
        progressBarAlt.classList.add("hidden");
        progressbar.classList.add("hidden");
    }
    else if(tutorialFiles<11){
        progressBarAlt.classList.add("hidden");

        let step = "";

        for(let i = 0; i<tutorialFiles; i++){
            step = step + "<div class=\"step\"><div class=\"bullets\">" + (i+1) + "</div></div>";
        }
    
        pb.innerHTML = step;
    }
    else {
        progressBarAlt.innerHTML = `${current+1} / ${tutorialFiles}`;
        progressbar.classList.add("hidden");
        progressBarAlt.classList.remove("hidden");
    }

}

function addEmptyLines(){
    const  bullets  =  [...document.querySelectorAll('.bullets')];

    for(let i = 0; i < bullets.length-1; i++){
        //add empty progress line
        let currentX = bullets[i].getBoundingClientRect().left;
        let nextX = bullets[i+1].getBoundingClientRect().left;
        let lineWidth = nextX - currentX - 24; 
    
        // Create a new element to add
        const line = document.createElement("div");
        line.classList.add("emptyline");
        line.style.width = lineWidth + "px";
    
        bullets[i].appendChild(line);
    }
    
    bullets[0].classList.add('currentstep');
}

function addBulletEvents() {
    const  bullets  =  [...document.querySelectorAll('.bullets')];

    for(let i = 0; i < bullets.length; i++){
	let bullet = bullets[i];
	let stepNumber = i+1;
	bullet.addEventListener('click',  ()  =>  { updateCurrentButtonTo(i);
						  });
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

addPb();
addBulletEvents();
sleep(5).then(addEmptyLines);

