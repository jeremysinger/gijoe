'use strict';

const express = require('express');
const fs = require('fs').promises;

const PORT = 8080;
const HOST = '0.0.0.0';
const workdir = __dirname + "/custom";

const app = express();
app.get('/', (req,res) => {
    fs.readFile(workdir + "/js.html")
	.then(contents => {
	    res.setHeader("Content-Type", "text/html");
	    res.writeHead(200);
	    fs.readFile(workdir + "/instructions.txt")
		.then(instrs => {
		    fs.readFile(workdir + "/initialcode.js")
			.then(initcode => {
			    fs.readFile(workdir + "/preamble.js")
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
app.use("/static", express.static("public"));

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);

