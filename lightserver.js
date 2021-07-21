'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const markdown = require("markdown").markdown;
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
					fs.readFile(workdir + "/settings.json")
					.then(settings => {
						fs.readFile(workdir + "/savefiles/1.js")
						.then(savecode => {
							fs.readdir(workdir + "/tutorials")
							.then(files => {
								let s = contents.toString()
								.replace("<!-- INSTRS -->", instrs)
								.replace("/* initial code */", initcode)
								.replace("<!-- PREAMBLE CODE -->", preamble)
								.replace("/* tutorial_settings */", settings)
								.replace("/* saved code */", savecode)
								.replace("/* tutorial_files */", files.length);
								res.end(s);
							})
						})
					})
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
app.post(`/autosave/:id`, (req, res) => {
	const savePath = `${workdir}/savefiles/${req.params.id}.js`;
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

app.get(`/tutorial/:id`, (req, res) => {
	fs.readFile(`${workdir}/tutorials/${req.params.id}.md`)
		.then(contents => {
			let HTML = markdown.toHTML(contents.toString());
			res.setHeader("Content-Type", "text/html");
			res.writeHead(200);
			res.end(HTML);
			return;
		})
		.catch(err => {
			res.writeHead(404);
			res.end("FILE NOT FOUND");
			return;
		})
});

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);