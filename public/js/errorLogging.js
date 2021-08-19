hintMap = {
    "ReferenceError": "don't forget to spell functions, variables and objects correctly and to only use those that you have already defined!", 
    "TypeError": "make sure that you're accessing the right method",
    "SyntaxError": "check for missing or open brackets, or missing parentheses or punctuation", 
    "RangeError": "A RangeError is thrown when trying to pass a value as an argument to a function that does not allow a range that includes the value.",
    "InfiniteLoop": "Be careful about loops where the breaking condition will never be met. You might end up caught in an infinite loop!"
}

let output = document.getElementById("output");
let outputArea = document.getElementById("codeOutput");

function handleError(err) {

    runtimeError = true;

    //show the output area so that the hints can be displayed
    outputArea.style.display = "block";

    if (err.name == "SyntaxError"){
        console.log("---"); //because the then function wrapping eval won't be executed and only the outer catch will handle Syntax errors
        output.innerHTML = `<font color='red'>ERROR: ${err}<br></br>HINT: ${hintMap[err.name]}</font>`;
    }
    else if (err.name in hintMap) {
        var lineNumber = getLineNumber(err.stack);  
        output.innerHTML = `<font color='red'>ERROR: ${err} at line ${lineNumber}<br></br>HINT: ${hintMap[err.name]}</font>`;
    }
    else {
        output.innerHTML = `<font color='red'>UNDEFINED ERROR: ${err} at line ${lineNumber}</font>`;
    }
}