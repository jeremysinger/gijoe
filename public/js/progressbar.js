const  Btnprevious  =  document.getElementById('tutorialBack');
const  Btnnext  =  document.getElementById('tutorialForward');
// const  Btnsubmit  =  document.getElementById('Submit');
const  bullets  =  [...document.querySelectorAll('.bullets')];
const pb = document.getElementById("pb");

let current = 0;
const max = 2;
// let barLength = bullets.style.


Btnnext.addEventListener('click',  ()  =>  {
    bullets[current].classList.add('completed');
    if(current != max){
        let currentX = bullets[current].getBoundingClientRect().left;
        let nextX = bullets[current+1].getBoundingClientRect().left;
        let lineWidth = nextX - currentX - 24; 
    
        // Create a new element to add
        const line = document.createElement("div");
        line.classList.add("line");
        line.style.width = lineWidth + "px";
    
        // Insert the created element
        bullets[current].appendChild(line);
    }

    current  +=  1;
    Btnprevious.style.display  =  'inline';
});

Btnprevious.addEventListener('click',  ()  =>  {

    if(current!=max+1){
        //get rid of completed line
        let test = bullets[current-1].childNodes[1];
        test.remove();

        //add empty progress line
        let currentX = bullets[current].getBoundingClientRect().left;
        let prevX = bullets[current-1].getBoundingClientRect().left;
        let lineWidth = currentX - prevX - 24; 
    
        // Create a new element to add
        const line = document.createElement("div");
        line.classList.add("emptyline");
        line.style.width = lineWidth + "px";
    
        bullets[current-1].appendChild(line);
    }

    bullets[current  -  1].classList.remove('completed');
    current  -=  1;
});

function addEmptyLines(){
    for(let i = 0; i < bullets.length-1; i++){
        console.log(i+1);
        //add empty progress line
        let currentX = bullets[i].getBoundingClientRect().left;
        let nextX = bullets[i+1].getBoundingClientRect().left;
        let lineWidth = nextX - currentX - 24; 
    
        // Create a new element to add
        const line = document.createElement("div");
        line.classList.add("emptyline");
        line.style.width = lineWidth + "px";
        console.log(i+1);
    
        bullets[i].appendChild(line);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(5).then(addEmptyLines);

