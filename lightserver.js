'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const showdown = require("showdown");
const converter = new showdown.Converter({
	tables: true,
	strikethrough: true,
	tasklists: true
});
//Set up the Port and the Host
const PORT = 8080;
const HOST = '0.0.0.0';
const workdir = __dirname + "/custom";

const app = express();
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req,res) => {
	checkSaveExists();
	checkTutorialExists();
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
								settings = JSON.parse(settings);
								if (settings.libraries.turtle) {
									fs.readFile(workdir + "/turtleCanvas.html")
									.then(turtleContent => {
										let turtleString = turtleContent.toString();
										s = s.replace("<!-- LIBRARY-CONTROLS -->", turtleString);
										res.end(s);
									})
								} else if (settings.libraries.DOM) {
									fs.readFile(workdir + "/DOMArea.html")
									.then(domContent => {
										let domString = domContent.toString();
										s = s.replace("<!-- LIBRARY-CONTROLS -->", domString);
										res.end(s);
									})
								} else {
									res.end(s);
								}
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
			let HTML = converter.makeHtml(contents.toString());
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

app.get(`/savefile/:id`, (req, res) => {
	const savePath = `${workdir}/savefiles/${req.params.id}.js`;
	const defaultSaveFile = `/* Default savefile */`;
	fs.readFile(savePath)
		.then(contents => {
			var data = JSON.stringify({code: contents.toString()});
			res.setHeader("Content-Type", "application/json");
			res.writeHead(200);
			res.end(data);
			return;
		})
		.catch(err => {
			const tutorialPath = `${workdir}/tutorials/${req.params.id}.md`;
			fs.readFile(tutorialPath)
				.then(tutorial => {
					fs.writeFile(savePath, defaultSaveFile)
						.then(file => {
							fs.readFile(savePath)
								.then(content => {
									const data = JSON.stringify({code: content.toString()});
									res.setHeader("Content-Type", "application/json");
									res.writeHead(200);
									res.end(data);
									return;
								});
						})
						.catch(writeFileError => {
							console.log(writeFileError);
							res.writeHead(404);
							res.end(writeFileError);
							return;
						})
				})
				.catch(error => {
					res.writeHead(404);
					res.end("FILE NOT FOUND");
					return;
				});
		})
});

function checkSaveExists() {
	const savePath = workdir + "/savefiles/1.js";
	fs.readFile(savePath)
		.then(result => {
			return true;
		})
		.catch(error => {
			fs.writeFile(savePath, "/* Generic Javascript Code */");
			return true;
		})
}

function checkTutorialExists() {
	const tutorialPath = workdir + "/tutorials/1.md";
	
	
	fs.readFile(tutorialPath)
	.then(result => {
		return true;
	})
	.catch(error => {
		fs.writeFile(tutorialPath ,"# Generic Tutorial File");
		return true;
	})
}

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);