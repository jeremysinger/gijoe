'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

//Set up the Port and the Host
const PORT = 8080;
const HOST = '0.0.0.0';
const workdir = __dirname + "/custom";

const app = express();
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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


//This will be the POST request that will save to the savefile folder
app.post("/autosave", (req, res) => {
	const savePath = workdir + "/savefiles/save.js";
	try {
		fs.writeFile(savePath, req.body.code, err => {
			if (err) {
				console.error(err);
				return;
			}
		});
		res.status(201).send("AUTOSAVE");
	} catch (err) {
		res.status(400).send("AUTOSAVE FAILED");
	}
});

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);

