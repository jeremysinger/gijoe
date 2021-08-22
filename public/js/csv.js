const fileUploadDiv = document.getElementById("fileUpload");
const fileSelectDiv = document.getElementById("fileSelect");
const enterStringDiv = document.getElementById("enterString");

const csvInput = document.getElementById("select-input");
const csvDisplay = document.getElementById("csv-display");
const csvSelect = document.getElementById("select-file");
const csvUpload = document.getElementById("upload-file");

fileUploadDiv.style.display = "none";
fileSelectDiv.style.display = "none";

let visDict = {
    "string": ["block", "none", "none"],
    "uploadFile": ["none", "block", "none"],
    "selectFile": ["none", "none", "block"]
}

csvInput.addEventListener("change", (e) => {
    let value = csvInput.value;
    let displayList = visDict[value];
    enterStringDiv.style.display = displayList[0];
    fileUploadDiv.style.display = displayList[1];
    fileSelectDiv.style.display = displayList[2];
})

csvUpload.addEventListener("change", (e) => {
    let files = e.target.files;
    if (!files) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        let contents = e.target.result;
        loadCSV(contents);
    }
    reader.readAsText(files[0]);
})

csvSelect.addEventListener("change", (e) => {
    csvDisplay.innerHTML = "<h1>Loading</h1>";
    var http = new XMLHttpRequest();
    http.open("GET", `/csv/${csvSelect.value}`);
    http.onload = function() {
        loadCSV(http.responseText);
    }
    http.send();
});

function loadCSV(file) {
    let theData = Papa.parse(file).data;
    let theTable = document.createElement("table");
    const header = theData[0];
    headerRow = document.createElement("tr");
    header.map(item => {
        let headerItem = document.createElement("th");
        headerItem.innerHTML = item;
        headerRow.appendChild(headerItem);
    });
    theTable.appendChild(headerRow);
    
    for (var i = 1; i < 4 && i < theData.length; i++) {
        theRow = document.createElement("tr");
        rowData = theData[i];
        rowData.map(item => {
            let itemElement = document.createElement("td");
            itemElement.innerHTML = item;
            theRow.appendChild(itemElement);
        });
        theTable.appendChild(theRow);
    }
    removeAllChildNodes(csvDisplay);
    csvDisplay.appendChild(theTable);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}