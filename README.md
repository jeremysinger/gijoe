# Glasgow Interactive JavaScript Online Editor

## What is GIJOE?

The Glasgow Interactive JavaScript Online Editor is a web-based JavaScript coding environment
for novices. It enables users to write short snippets of JavaScript code in a textbox,
then execute this by clicking a 'run' button and observing the results immediately.

We expect code to output string values to the console log (which we visualize) and
to generate simple graphics with turtle libraries (which we support directly). These
small programs are typical 'beginner' exercises, which we will embed in our
Computational Thinking with JavaScript MOOC.

## Lab Setup Instructions

In order for your lab to be setup properly. You need the following requirements inside your zip folder. These are

* **A "tutorials" folder** - This directory will contain the markdown files. For now we still have the system where you need to have multiple md files which are numbered from 1. So for example the first tutorial will be 1.md, the second tutorial will be 2.md etc
* **A "savefiles" folder** - This directory contains the JavaScript that the user will edit. If you want any starter code for any of the md files that you have written then simply create a JavaScript file and name it with the same number as the corresponding markdown file. E.g. starter code for 1.md should be named 1.js. You don't need to have a file for every markdown file as a js file will be created when you first load the lab
* **A settings.json file** - Please see the "Settings" header for more information on how to set this up
* **instructions.txt** this file contains the instructions at the top

**As of the 10th August 2021, the js.html and preamble.js files are now in a seperate directory and you do not need to include this in the folders.**

## Running Instructions

### Docker Installation

To generate the docker image, simply execute
`docker build -t gijoe .`
from within this directory. Then run this container with
`docker run -p 8080:8080 -d gijoe`

and browse to http://localhost:8080 to see GIJOE in action.

### Direction Execution

To run directly using node, simply execute
`npm install`
from within this directory to fetch the appropriate packages. Then
run the app with
`node lightserver.js`

and browse to http://localhost:8080 to see GIJOE in action.

## Sightings in the Wild

We are intending to run GIJOE in the online labs for our
upcoming Coursera specialization entitled *Computational
Thinking with JavaScript*.

## Tutorials

All tutorials must be written within the tutorials file. The
website takes in markdown files and each tutorial file must
be numbered in order. E.g. 1.md, 2.md etc. In order to parse
through the markdown we are making use of the showdown library.
For documentation of the syntax click [here](http://demo.showdownjs.com)

If you want to have a specific code base with your tutorial
please enter js files in the savefiles directory and name the
files with the same number as the markdown files within the tutorial
file. e.g. 1.md will have the savefile 1.js. Don't worry if you
don't have a js file for each md file as they will be automatically
created when the user opens the tutorial for the first time.

## Settings

For creating labs we have the settings.json file to help you choose how you want your labs to be carried out. The settings.json should look like this:

```json
{
  "tutorial": true,
  "autoComplete": false,
  "loopLimit": 100,
  "libraries": {
       "turtle": true,
       "DOM": false
  }  
}
```

There are currently two options that you can make use of these include

* **tutorial** (default option true)
  * This determines whether or not you want the tutorial space to show during the lab. If you don't want the tutorial space to show up then just set this to false
* **autoComplete** (default option false)
  * This turns on the auto complete option as you type.
* **loopLimit** (default option 100)
  * This is in the form of an integer. It states the maximum amount of loops you want before the code timesout.
* **libraries** - This stores the libraries that are used during various parts of the the GIJOE course
  * If you want to turn on a library then all you have to do is set the boolean for that libray to true. NOTE you can only use one of the libraries at a time
  * If there are no libraries switched on then you will just get the console and the code evaluation
