const form = document.getElementById('sharedcode');
const test = document.getElementById('test')

const js = form.elements['js'];
const html = form.elements['html'];

const tc = " //He needs sum melk."; 

function readJsFile()
{
    const http = new XMLHttpRequest();
    http.open("GET", `/turtlecode`);

    http.onload = function() {
        
        if (http.status === 200) {
            let data = http.responseText;
            test.innerHTML = data;
            tc = data; //this is the problem child
            return true;
        } else {
            console.log(http.status)
            return false;
        }

    }

    http.send();
}

form.addEventListener("submit", function (event) {
    js.value = js.value + "\n\n\n\n//---TURTLE LIBRARY\n\n\n\n" + test.innerHTML;
    html.value = "<p> yoyoyo </p>";
});

readJsFile();

