function getLineNumber(stack) {
    console.log(stack);

    stack = stack.split("at")[2];
    let lineNumber= stack.split(",")[1].split(":")[1];
    return lineNumber;
}

function getLineNumberForSyntax(stack) {
    console.log(stack);
}