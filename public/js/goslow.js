//This should really be a class tbh

let isGoSlowOn = true;

function goSlowMode(codeFragment) {
    if(isGoSlowOn){
        codeFragment = "async function code(){ " + codeFragment + " } code()";
	// other async and await keywords inserted by acorn tree walker
    }
    return codeFragment;
}

function goSlowSwitch() {
    isGoSlowOn = !isGoSlowOn;
}
