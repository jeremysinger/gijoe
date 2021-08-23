const fileUploadDiv = document.getElementById("fileUpload");
const fileSelectDiv = document.getElementById("fileSelect");
const enterStringDiv = document.getElementById("enterString");

const csvInput = document.getElementById("select-input");
const csvDisplay = document.getElementById("csv-display");
const csvSelect = document.getElementById("select-file");
const csvUpload = document.getElementById("upload-file");
const csvStringInput = document.getElementById("stringCsvInput");
const csvStringSubmit = document.getElementById("submitCsvString");

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
});

csvStringSubmit.addEventListener("click", (e) => {
    let csvString = csvStringInput.value;
    loadCSV(csvString);
    csvStringInput.value = "";
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
    if (csvSelect.value != "select") {
        csvDisplay.innerHTML = "<h4>Loading</h4>";
        var http = new XMLHttpRequest();
        http.open("GET", `/csv/${csvSelect.value}`);
        http.onload = function() {
            loadCSV(http.responseText);
        }
        http.send();
    }
});

function loadCSV(file) {
    csvString = file.trim();
    let theData = Papa.parse(file).data;
    let theTable = document.createElement("table");
    const header = theData[0];
    let headerRow = createTableRow(header, "th");
    let maxCols = header.length;
    theTable.appendChild(headerRow);
    
    for (var i = 1; i < 4 && i < theData.length; i++) {
        rowData = theData[i];
        theRow = createTableRow(rowData, "td");
        theTable.appendChild(theRow);
        if (rowData.length > maxCols) {
            maxCols = rowData.length;
        }
    }
    if (theData.length >= 4) {
        theRow = document.createElement("tr");
        let itemElement = document.createElement("td");
        itemElement.classList.add("end-row");
        itemElement.colSpan = maxCols;
        itemElement.style.textAlign = "center";
        itemElement.innerHTML = `This csv contains ${theData.length} lines`;
        theRow.appendChild(itemElement);
        theTable.appendChild(theRow);
    }
    removeAllChildNodes(csvDisplay);
    csvDisplay.appendChild(theTable);
}

function createTableRow(data, tableElement) {
    theRow = document.createElement("tr");
    data.map(item => {
        let itemElement = document.createElement(tableElement);
        itemElement.innerHTML = item;
        theRow.appendChild(itemElement);
    });
    return theRow
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}