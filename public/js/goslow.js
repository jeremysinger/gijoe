const goSlowButton = document.getElementById("goSlowButton");
let isGoSlowOn = true;

function goSlowMode(codeFragment){
    if(isGoSlowOn){
        codeFragment = "async function code(){ " + codeFragment + " } code();"; 
        codeFragment = codeFragment.replace(/forward/gi, " await sleep(1000); forward");
    }
    return codeFragment;
}


function goSlowSwitch(){
    
    isGoSlowOn = !isGoSlowOn;

    if(isGoSlowOn){
        goSlowButton.innerHTML = "Speed up turtle!"
    }
    else{       
        goSlowButton.innerHTML = "Slow down turtle!"
    }
}