errorMap = {
    "ReferenceError": "don't forget to spell functions, variables and objects correctly and to only use those that you have already defined!", 
    "TypeError": "make sure that you're accessing the right method idk man",
    "SyntaxError": "", 
    "RangeError": "",
}

function handleError(err) {
    if (err.name in errorMap) {
        console.log("ERROR: " + err);
        console.log(errorMap[err.name]);
    }
    else {
        console.log("UNDEFINED ERROR: " + err);
    }
}