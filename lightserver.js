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
    splitMarkdown().then(_ => {
	splitInitcode().then(_ => {
	    checkSaveExists();
	});
    });

    getTurtlecode();
    fs.readFile(appdir + "/js.html")
	.then(contents => {
	    res.setHeader("Content-Type", "text/html");
	    res.writeHead(200);
	    fs.readFile(appdir + "/version_stamp.txt")
		.then(version => {
		    fs.readFile(workdir + "/instructions.txt")
			.then(instrs => {
			    fs.readFile(workdir + "/initialcode.js")
				.then(initcode => {
				    fs.readFile(workdir + "/settings.json")
					.then(settings => {
					    fs.readFile(appdir + "/savefiles/1.js")
						.then(savecode => {
						    let s = contents.toString()
							.replace("<!-- VERSION -->", version)
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
								    .then(turtlecode => {
									s = s.replace("<!-- PREAMBLE CODE -->", turtlecode);
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
	})
	.catch(err => {
	    res.writeHead(500);
	    res.end(err);
	    return;
	});
});

//This will be the POST request that will save to the savefile folder
app.post(`/autosave/:id`, (req, res) => {
	const savePath = `${appdir}/savefiles/${req.params.id}.js`;
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
	const savePath = `${appdir}/savefiles/${req.params.id}.js`;
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
			var theId = parseInt(req.params.id);
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
			} else {
				res.writeHead(404);
				res.end("FILE NOT FOUND");
				return;
			}
		});
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
	const savePath = appdir + "/savefiles/1.js";
	fs.readFile(savePath)
		.then(result => {
			return true;
		})
	        .catch(error => {
	            console.log('no 1.js savefile ... creating');
	            let content = "/* Generic Javascript Code */";
	            if (initcodeList[0]) {
		        content =  initcodeList[0];
	            }
	            else {
		        console.log('unable to access initcodeList');
	            }
	            fs.writeFile(savePath, content);
	            return true;
	        })
}

function splitMarkdown() {
    return new Promise((resolve, reject) => {
        fs.readFile(workdir + "/tutorials.md")
        .then(markdown => {
            markdown = markdown.toString();
            markdownList = markdown.split("##NEXT##")
            .map(markdown => markdown.trim());
            resolve();
        })
        .catch(error => {
            console.error("splitMarkdown error " + err);
            reject();
        })
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
		return true;
	});
}

function splitInitcode() {
    return new Promise((resolve, reject) => {
        fs.readFile(workdir + "/initialcode.js")
        .then( code => {
            code = code.toString();
            initcodeList = code.split("/* <!-- NEXT --> */")
            .map(code => code.trim());
            createSavefileDir();
            resolve();
        })
        .catch (error => {
            console.error('splitInitcode error: ' + err);
            reject();
        })
    });
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
	if (initcodeList[0]) {
		fs.writeFile(dir + "/1.js", initcodeList[0]);
	} else {
		fs.writeFile(dir + "/1.js", "/* Default Javascript file */");
	}
	return;
}

function createSavefileDir() {
	console.log("CREATE SAVEFILE CALLED");
	var savefilesDir = appdir + "/savefiles";
	console.log(savefilesDir);
	fs.readdir(savefilesDir)
	.then(saveFiles => {
		console.log("Reading savefiles directory")
		fs.readFile(savefilesDir + "/1.js")
		.then(files => {
			return true;
		})
		.catch(error => {
			console.log("1.js does not exist, creating 1.js");
			createFirstSaveFile(savefilesDir);
			return true;
		});
	})
	.catch(error => {
		console.error("Error creating the savefiles directory")
		fs.mkdir(savefilesDir);
		createFirstSaveFile(savefilesDir);
		return true;
	});
}

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);
