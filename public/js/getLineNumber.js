function getLineNumber(stack) {
    try {
        console.log(stack);
        stack = stack.split("at")[2];
        let lineNumber= stack.split(",")[1].split(":")[1];
        return lineNumber - 1;
    } catch(e) {
        return -1;
    }
    
}