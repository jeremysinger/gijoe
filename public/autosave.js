/*
Autosave feature for the gijoe repo. For now I'm gonna make use of the localStorage function
before I understand where the data will be going. I assume that there will be a database
somewhere that we can use in order.
*/
console.log("Autosave loaded successfully");

setInterval(autosave, 60000);

function autosave() {
    alert("Autosaved");
}