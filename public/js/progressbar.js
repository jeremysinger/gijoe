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
        // line.innerHTML = "<h4>new node</h4>";
        line.classList.add("line");
        line.style.width = lineWidth + "px";
    
        // Insert the created element
        bullets[current].after(line);
    }

    current  +=  1;
    Btnprevious.style.display  =  'inline';
});

Btnprevious.addEventListener('click',  ()  =>  {
    bullets[current  -  1].classList.remove('completed');
    current  -=  1;
});

