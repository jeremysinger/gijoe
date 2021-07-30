hintMap = {
    "ReferenceError": "don't forget to spell functions, variables and objects correctly and to only use those that you have already defined!", 
    "TypeError": "make sure that you're accessing the right method idk man",
    "SyntaxError": "hey there", 
    "RangeError": "hello there",
}

function handleError(err) {
    if (err.name in hintMap) {
        output.innerHTML = `<font color='red'>ERROR: ${err}<br></br>HINT: ${hintMap[err.name]}</font>`;
    }
    else {
        output.innerHTML = `<font color='red'>UNDEFINED ERROR: ${err}</font>`;
    }
    
    // getLineNumber(err.stack); this gives error under some conditions: if it is a Syntax error the stack string can't be split this many times  
    
    console.log("---");  //place a divider between the outputs of different runs of the code
    
}

let output = document.getElementById("output");