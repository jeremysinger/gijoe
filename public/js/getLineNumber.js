function getLineNumber(stack) {
    console.log(stack);
    stack = stack.split("at")[2];
    let lineNumber= stack.split(",")[1].split(":")[1];
    lineNumber = parseInt(lineNumber) - 1; //Because CodeMirror counts line numbers from 0
    myCodeMirror.markText({line: lineNumber, ch: 0}, {line: lineNumber, ch: 999}, {style: "styled-background"});
}