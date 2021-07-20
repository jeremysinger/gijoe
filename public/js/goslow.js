//This should really be a class tbh

const goSlowButton = document.getElementById("goSlowButton");
const speedBumps = new Array("forward", "left", "right");
const delayTime = 1000;

let isGoSlowOn = true;
let timesDelayIsApplied = 0

function slowDownAt(codeBit, codeFragment){
    let regex = new RegExp(codeBit, "gi"); //perform a global, case insensitive replacement

    let substitution = " await sleep(" + delayTime + "); " + codeBit;

    timesDelayIsApplied++;
    return codeFragment.replace(regex, substitution);  
}

function goSlowMode(codeFragment){
    if(isGoSlowOn){
        codeFragment = "async function code(){ " + codeFragment + " } code();"; 

        for(let i = 0; i < speedBumps.length; i++){
            codeFragment = slowDownAt(speedBumps[i], codeFragment);
        }
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