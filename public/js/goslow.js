const goSlowButton = document.getElementById("goSlowButton");
let isGoSlowOn = true;
const speedBumps = new Array("forward", "left", "right");

function slowDownAt(codeBit, codeFragment){
    let regex = new RegExp(codeBit, "gi"); //perform a global, case insensitive replacement

    let substitution = " await sleep(1000); " + codeBit

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