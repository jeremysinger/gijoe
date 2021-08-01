//This should really be a class tbh
const speedBumps = new Array("forward", "left", "right");
const slider = document.getElementById( "custom-handle" );

let isGoSlowOn = true;

function slowDownAt(codeBit, codeFragment){
    let delayTime = slider.innerHTML;
    let regex = new RegExp(codeBit, "gi"); //perform a global, case insensitive replacement

    let substitution = "delayTime = slider.innerHTML; await sleep(delayTime); " + codeBit;

    return codeFragment.replace(regex, substitution);  
}

function goSlowMode(codeFragment){
    codeFragment = `let check = 0;\n ${codeFragment}`
    codeList = codeFragment.split("\n");
    console.log(codeList);
    var indexes = [];
    var infiniteLoopChecker = "check++; if(check > 1000) { break; }";
    for (var i = 0; i < codeList.length; i++) {
        console.log(i);
        if ((codeList[i].includes("for") && !codeList[i].includes("forward")) || codeList[i].includes("while")) {
            indexes.push(i);
        }
    }
    console.log(indexes);
    let the_index;
    for (var j = 0; j < indexes.length; j++) {
        the_index = indexes[j];
        codeList[the_index] = `check = 0; ${codeList[the_index]} ${infiniteLoopChecker}`;
    }
    console.log(codeList);
    codeFragment = codeList.join("\n");

    if(isGoSlowOn){
        codeFragment = "const slider = document.getElementById('custom-handle'); let delayTime = slider.innerHTML; async function code(){ " + codeFragment + " } code()";
        for(let i = 0; i < speedBumps.length; i++){
            codeFragment = slowDownAt(speedBumps[i], codeFragment);
        }
    }
    return codeFragment;
}

function goSlowSwitch(){
    
    isGoSlowOn = !isGoSlowOn;

}