'use strict';

const express = require('express');
const fs = require('fs').promises;

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req,res) => {
    fs.readFile(__dirname + "/js.html")
	.then(contents => {
	    res.setHeader("Content-Type", "text/html");
	    res.writeHead(200);
	    fs.readFile(__dirname + "/instructions.txt")
		.then(instrs => {
		    fs.readFile(__dirname + "/initialcode.js")
			.then(initcode => {
			    fs.readFile(__dirname + "/turtle.js")
				.then(preamble => {
				    let s = contents.toString()
					.replace("<!-- INSTRS -->", instrs)
					.replace("/* initial code */", initcode)
					.replace("<!-- PREAMBLE CODE -->", preamble);
				    res.end(s);
				})
			})
		})
	})
	.catch(err => {
	    res.writeHead(500);
	    res.end(err);
	    return;
	});
});

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);

