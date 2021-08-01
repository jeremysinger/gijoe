hintMap = {
    "ReferenceError": "don't forget to spell functions, variables and objects correctly and to only use those that you have already defined!", 
    "TypeError": "make sure that you're accessing the right method idk man",
    "SyntaxError": "hey there", 
    "RangeError": "hello there",
}

function handleError(err) {
    if (err.name == "SyntaxError"){
        var lineNumber = getLineNumberForSyntax(err.stack);
        console.log("---");
    } else {
        var lineNumber = getLineNumber(err.stack);        
    }

    if (err.name in hintMap) {
        output.innerHTML = `<font color='red'>ERROR: ${err} at line ${lineNumber}<br></br>HINT: ${hintMap[err.name]}</font>`;
    }
    else {
        output.innerHTML = `<font color='red'>UNDEFINED ERROR: ${err} at line ${lineNumber}</font>`;
    }
}

let output = document.getElementById("output");