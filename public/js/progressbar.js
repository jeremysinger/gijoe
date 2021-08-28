const  Btnprevious  =  document.getElementById('tutorialBack');
const  Btnnext  =  document.getElementById('tutorialForward');
// const  Btnsubmit  =  document.getElementById('Submit');
const  bullets  =  [...document.querySelectorAll('.bullets')];

let current = 0;
const max = 2;

Btnnext.addEventListener('click',  ()  =>  {
    bullets[current].classList.add('completed');
    current  +=  1;
    Btnprevious.style.display  =  'inline';
});

Btnprevious.addEventListener('click',  ()  =>  {
    bullets[current  -  1].classList.remove('completed');
    current  -=  1;
});

