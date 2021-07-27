# Glasgow Interactive JavaScript Online Editor

## What is GIJOE?

The Glasgow Interactive JavaScript Online Editor is a web-based JavaScript coding environment
for novices. It enables users to write short snippets of JavaScript code in a textbox,
then execute this by clicking a 'run' button and observing the results immediately.

We expect code to output string values to the console log (which we visualize) and
to generate simple graphics with turtle libraries (which we support directly). These
small programs are typical 'beginner' exercises, which we will embed in our
Computational Thinking with JavaScript MOOC.

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

For creating labs we have the settings.json file to help you choose how you want your labs to be carried out. The settings.json file will look like this:

```json
{
  tutorial: true,
  autoComplete: false
}
```

 There are currently two options that you can make use of these include

* **tutorial** (default option true)
  * This determines whether or not you want the tutorial space to show during the lab. If you don't want the tutorial space to show up then just set this to false
* **autoComplete** (default option false)
  * This turns on the auto complete option as you type.
