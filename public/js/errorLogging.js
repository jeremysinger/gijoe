hintMap = {
    "ReferenceError": "don't forget to spell functions, variables and objects correctly and to only use those that you have already defined!", 
    "TypeError": "make sure that you're accessing the right method idk man",
    "SyntaxError": "", 
    "RangeError": "",
}

function handleError(err) {
    if (err.name in hintMap) {
        output.innerHTML = `<font color='red'>ERROR: ${err}<br></br>HINT: ${hintMap[err.name]}</font>`;
    }
    else {
        output.innerHTML = `<font color='red'>UNDEFINED ERROR: ${err}</font>`;
    }
    getLineNumber(err.stack);
    
}

let output = document.getElementById("output");