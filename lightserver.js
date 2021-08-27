'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const showdown = require("showdown");
const path = require('path');
const converter = new showdown.Converter({
	tables: true,
	strikethrough: true,
	tasklists: true
});
//Set up the Port and the Host
const PORT = 8080;
const HOST = '0.0.0.0';
const workdir = __dirname + "/custom";
const appdir = __dirname + "/gijoe_app";
let markdownList = [];
let initcodeList = [];
let turtlecode = "";



const app = express();
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req,res) => {
	splitMarkdown();
	splitInitcode();
<<<<<<< HEAD
=======
	
>>>>>>> 28e17ac4cb4776f027e2f1de3fd2251c98db1c16
	getTurtlecode();
	checkSaveExists();
    fs.readFile(appdir + "/js.html")
	.then(contents => {
	    res.setHeader("Content-Type", "text/html");
	    res.writeHead(200);
	    fs.readFile(workdir + "/instructions.txt")
		.then(instrs => {
		    fs.readFile(workdir + "/initialcode.js")
			.then(initcode => {
				fs.readFile(workdir + "/settings.json")
				.then(settings => {
					fs.readFile(workdir + "/savefiles/1.js")
					.then(savecode => {
						let s = contents.toString()
						.replace("<!-- INSTRS -->", instrs)
						.replace("/* initial code */", initcode)
						.replace("/* tutorial_settings */", settings)
						.replace("/* saved code */", savecode)
						.replace("/* tutorial_files */", markdownList.length)
						.replace("/* initcode_files */", initcodeList.length);
						settings = JSON.parse(settings);
						if (settings.libraries.turtle) {
							fs.readFile(appdir + "/turtleCanvas.html")
							.then(turtleContent => {
								let turtleString = turtleContent.toString();
								s = s.replace("<!-- LIBRARY-CONTROLS -->", turtleString)
								.replace("/* library check */", true)
								.replace("/* go slow */", true);
								fs.readFile(appdir + "/turtle.js")
									.then(code => {
										s = s.replace("<!-- PREAMBLE CODE -->", code);
										res.end(s);
										return;
									});
							});
						} else if (settings.libraries.DOM) {
							fs.readFile(appdir + "/DOMArea.html")
							.then(domContent => {
								let domString = domContent.toString();
								s = s.replace("<!-- LIBRARY-CONTROLS -->", domString)
								.replace("/* library check */", true)
								.replace("/* go slow */", false);
								//Get the HTML file
								fs.readFile(`${workdir}/htmlFiles/exercise.html`)
								res.end(s);
								return;
							});
						} else if (settings.libraries.csv) {
							fs.readFile(appdir + "/CSVArea.html")
							.then(csvContent => {
								let csvString = csvContent.toString();
								s = s.replace("<!-- LIBRARY-CONTROLS -->", csvString)
								.replace("/* library check */", true)
								.replace("/* go slow */", false);
								fs.readFile(appdir + "/papaparse.min.js")
								.then(code => {
									s = s.replace("<!-- PREAMBLE CODE -->", code);
									fs.readdir(workdir + "/csv_files")
									.then(files => {
										var options = files.map(file => `<option value='${file}'>${file}</option>`);
										s = s.replace("<!-- OPTIONS -->", options);
										res.end(s);
										return;
									})
								});
							});

						} else if (settings.libraries.csvAndTurtle) {
							fs.readFile(appdir + "/CSVArea.html")
							.then(csvContent => {
								let csvString = csvContent.toString();
								s = s.replace("<!-- LIBRARY-CONTROLS -->", csvString)
								.replace("/* library check */", true)
								.replace("/* go slow */", true);
								fs.readFile(appdir + "/papaparse.min.js")
								.then(code => {
									let theCode = code;
									fs.readFile(appdir + "/turtle.js")
									.then(turtleCode => {
										theCode = theCode + turtleCode;
										s = s.replace("<!-- PREAMBLE CODE -->", theCode);
										fs.readFile(appdir + "/turtleCanvas.html")
										.then(turtleContent => {
											let turtleString = turtleContent.toString();
											s = s.replace("<!-- TURTLE AREA-->", turtleString);
											fs.readdir(workdir + "/csv_files")
											.then(files => {
												var options = files.map(file => `<option value='${file}'>${file}</option>`);
												s = s.replace("<!-- OPTIONS -->", options);
												res.end(s);
												return;
											})
										})
									})
								})
							})
						} else {
							s = s.replace("/* library check */", false)
							.replace("/* go slow */", false);
							res.end(s);
							return;
						}
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
	var id = req.params.id - 1;
	try {
		let HTML = converter.makeHtml(markdownList[id]);
		res.setHeader("Content-Type", "text/html");
		res.writeHead(200);
		res.end(HTML);
		return;
	} catch (err) {
		res.writeHead(404);
		res.end("FILE NOT FOUND");
		return;
	}
});

app.get(`/initcode/:id`, (req, res) => {
	var id = req.params.id - 1;
	try {
		// console.log(initcodeList[id].toString());
		var data = initcodeList[id];
		res.setHeader("Content-Type", "application/json");
		res.writeHead(200);
		res.end(data);
		return;
	} catch (err) {
		res.writeHead(404);
		res.end("FILE NOT FOUND");
		return;
	}
});

//TODO TC
app.get(`/turtlecode`, (req, res) => {
	try {
		var data = turtlecode;
		res.setHeader("Content-Type", "application/json");
		res.writeHead(200);
		res.end(data);
		return;
	} catch (err) {
		res.writeHead(404);
		res.end("FILE NOT FOUND");
		return;
	}
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
			if(markdownList[theId - 1]) {
				var theValue;
				if (initcodeList[theId - 1]) {
					theValue = initcodeList[theId - 1];
				} else {
					theValue = "/* Default Javascript file */";
				}
				fs.writeFile(savePath, theValue)
				.then(file => {
					fs.readFile(savePath)
						.then(content => {
							const data = JSON.stringify({code: content.toString()});
							res.setHeader("Content-Type", "application/json");
							res.writeHead(200);
							res.end(data);
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

//PATH FOR PRE-LOADED CSV FILES
app.get(`/csv/:filename`, (req, res) => {
	const filePath = `${workdir}/csv_files/${req.params.filename}`;
	fs.readFile(filePath)
	.then(content => {
		var s = content.toString();
		res.setHeader("Content-Type", "text/text");
		res.writeHead(200);
		res.end(s);
		return;
	})
	.catch(csvError => {
		console.log(csvError);
		res.writeHead(404);
		res.end("FILE NOT FOUND");
		return;
	});
});

app.get(`/htmlfile`, (req, res) => {
	const savefile = `${workdir}/htmlFiles/exercise.html`;
	fs.readFile(savefile)
	.then(file => {
		res.setHeader("Content-Type", "text/html");
		res.writeHead(200);
		res.end(file);
		return;
	})
	.catch(error => {
		res.writeHead(404);
		res.end("DATA NOT FOUND");
		return;
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

function checkTutorialFileExists() {
	const tutorialFile = workdir + "/tutorials.md";

	fs.readFile(tutorialFile)
	.then(file => {
		return true;
	})
	.catch(error => {
		fs.writeFile(tutorialFile, "# GENERIC TUTORIAL FILE");
		console.log("Tutorial File Created");
		return true;
	});
}

function splitMarkdown() {
	checkTutorialFileExists();
	fs.readFile(workdir + "/tutorials.md")
		.then(markdown => {
			markdown = markdown.toString();
			markdownList = markdown.split("##NEXT##")
				.map(markdown => markdown.trim());
		})
		.catch(error => {
			console.log("NO MD FILE FOUND");
		})
}

function checkInitcodeFileExists() {
	const InitcodeFile = workdir + "/initialcode.js";

	fs.readFile(InitcodeFile)
	.then(file => {
		console.log("INIT FILE FOUND");
		return true;
	})
	.catch(error => {
		fs.writeFile(InitcodeFile, "// GENERIC INITIALCODE FILE");
		console.log("Initcode File Created");
		return true;
	});
}

//TODO TC
function checkTurtlecodeExists() {
	const InitcodeFile = appdir + "/turtle.js";

	fs.readFile(InitcodeFile)
	.then(file => {
		return true;
	})
	.catch(error => {
		fs.writeFile(InitcodeFile, "// GENERIC TURTLECODE FILE");
		console.log("Turtlecode File Created");
		return true;
	});
}

function splitInitcode() {
	console.log("Init function called");
	checkInitcodeFileExists();
	fs.readFile(workdir + "/initialcode.js")
		.then(code => {
			code = code.toString();
			initcodeList = code.split("/* <!-- NEXT --> */")
				.map(code => code.trim());
			console.log(initcodeList);
			createSavefileDir();
		})
		.catch(error => {
			console.log("NO INITIALCODE FILE FOUND");
		})
}

//TODO TC
function getTurtlecode() {
	checkTurtlecodeExists();
	fs.readFile(appdir + "/turtle.js")
		.then(code => {
			code = code.toString();
			turtlecode = code.trim();
			//up until here it works
		})
		.catch(error => {
			console.log("NO TURTLECODE FILE FOUND");
		})
}

function createFirstSaveFile(dir) {
	console.log(initcodeList);
	if (initcodeList[0]) {
		fs.writeFile(dir + "/1.js", initcodeList[0]);
	} else {
		fs.writeFile(dir + "/1.js", "/* Default Javascript file */");
	}
	return;
}

function createSavefileDir() {
	var savefilesDir = appdir + "/savefiles"
	fs.readdir(savefilesDir)
	.then(saveFiles => {
		fs.readFile(savefilesDir + "/1.js")
		.then(files => {
			return true;
		})
		.catch(error => {
			console.log("1.js does not exist creating 1.js");
			createFirstSaveFile(savefilesDir);
			return true;
		});
	})
	.catch(error => {
		fs.mkdir(savefilesDir);
		createFirstSaveFile(savefilesDir);
		return true;
	})
}

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);