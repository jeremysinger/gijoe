//This should really be a class tbh
const speedBumps = new Array("forward", "left", "right");
const slider = document.getElementById( "custom-handle" );

let isGoSlowOn = true;

function slowDownAt(codeBit, codeFragment){
    let delayTime = slider.innerHTML;
    let regex = new RegExp(codeBit, "gi"); //perform a global, case insensitive replacement

    let substitution = "delayTime = turtleSpeed; await sleep(delayTime); " + codeBit;

    return codeFragment.replace(regex, substitution);  
}

function goSlowMode(codeFragment){
    let variables = [];
    let settings = JSON.parse(tutorialSettings);
    let timeout = settings.loopLimit;
    codeFragment = `timeout = false;\n ${codeFragment}`;
    codeList = codeFragment.split("\n");
    console.log(codeList);
    var indexes = [];
    var infiniteLoopChecker;
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
        variables.push(`check${j}`);
        infiniteLoopChecker = `check${j}++; if(check${j} > ${timeout}) {timeout = true; break; }`;
        codeList[the_index] = `check${j} = 0; ${codeList[the_index]} ${infiniteLoopChecker}`;
    }
    for (var k = 0; k < variables.length; k++) {
        codeList[0] = `let ${variables[k]}= 0; ${codeList[0]}`;
    }
    codeFragment = codeList.join("\n");

    if(isGoSlowOn){
        codeFragment = "const slider = document.getElementById('custom-handle'); let delayTime = turtleSpeed; async function code(){ " + codeFragment + " } code()";
        for(let i = 0; i < speedBumps.length; i++){
            codeFragment = slowDownAt(speedBumps[i], codeFragment);
        }
    }
    return codeFragment;
}

function goSlowSwitch(){
    
    isGoSlowOn = !isGoSlowOn;

}