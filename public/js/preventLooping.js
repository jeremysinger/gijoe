function preventInfiniteLooping(codeFragment) {

    let variables = [];
    let settings = tutorialSettings;
    let timeout = settings.loopLimit;
    codeFragment = `timeout = false;\n ${codeFragment}`;
    codeList = codeFragment.split("\n");
    var indexes = [];
    var infiniteLoopChecker;
    for (var i = 0; i < codeList.length; i++) {
        if ((codeList[i].includes("for") && !codeList[i].includes("forward")) || codeList[i].includes("while")) {
            indexes.push(i);
        }
    }
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

    return codeFragment;

}