const form = document.getElementById('sharedcode');

const js = form.elements['js'];
const html = form.elements['html'];

form.addEventListener("submit", function (event) {

    js.value = js.value + " //hey there pal";
    html.value = "<p> yoyoyo </p>";

});



