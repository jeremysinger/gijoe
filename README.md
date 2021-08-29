# Contents

* [What is GIJOE](#what-is-gijoe)
* [Libraries](#libraries)
* [Lab Setup Instructions](#lab-setup-instructions)
  * [If DOM is on](#lab-setup-if-dom-is-turned-on)
  * [If CSV is on](#lab-setup-if-the-csv-library-is-turned-on)
* [Running Instructions](#running-instructions)
* [Markdown Guide](#markdown-guide)
* [Custom Folder Files](#custom-folder-files)


# Glasgow Interactive JavaScript Online Editor

## What is GIJOE?

The Glasgow Interactive JavaScript Online Editor is a web-based JavaScript coding environment
for novices. It enables users to write short snippets of JavaScript code in a textbox,
then execute this by clicking a 'run' button and observing the results immediately.

We expect code to output string values to the console log (which we visualize) and
to generate simple graphics with turtle libraries (which we support directly). These
small programs are typical 'beginner' exercises, which we will embed in our
Computational Thinking with JavaScript MOOC.

## Libraries

Currently GIJOE has support for two libraries these include

* **Turtle** - this library contains a small turtle (represented by a triangle) as it moves around a canvas. Source code for this library can be found in the [turtle.js](https://git.dcs.gla.ac.uk/guss/jsmooc/-/blob/main/gijoe_app/turtle.js) file within the gijoe_app directory on this repository
* **DOM Experimentation Zone** - This is an area for a student to practice their DOM manipulation skills. Simply add an htmlFiles directory containing an exercise.html file to the custom file to play around with it. This creates an HTML editor alongside a representation of what that HTML looks like when rendered. (Please see the Lab Setup Instructions heading to see how to make use of this)

## Lab Setup Instructions

In order for your lab to be setup properly. You need the following requirements inside your zip folder. These are

* **A "tutorials" folder** - This directory will contain the markdown files. For now we still have the system where you need to have multiple md files which are numbered from 1. So for example the first tutorial will be 1.md, the second tutorial will be 2.md etc
* **A "tutorials.md" file** - This is a markdown file to contain all of the tutorial stuff. For full documentation please check the "tutorials.md" section in the documentation.
* **An initialcode.js file** this will be the replacement for the savefiles directory as they will be moved in the gijoe_app directory. Full documentation for this file can be found in the **initialCode file** part of the documentation.
* **A settings.json file** - Please see the "Settings" header for more information on how to set this up
* **instructions.txt** this file contains the instructions at the top

**As of the 10th August 2021, the js.html and preamble.js files are now in a seperate directory and you do not need to include this in the folders.**

### Lab Setup if DOM is turned on

If you wish to make use of the DOM library then you need one extra folder within the custom folder. This is the htmlFiles folder. Currently you only need one file which is called **exercise.html** . This will contain the HTML code for the exercise.

### Lab Setup if the CSV library is turned on

If you are wanting to have pre-loaded csv files in your lab then simply create a **csvFiles** directory and place any csv file that you want to work with in the directory


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

## Markdown Guide

### Text

For any paragraph text just simply type as if you are writing a .txt file or a Word Document. For h1-6 tags you simply use the # symbol for the size of the header. For example

```markdown
# Hello World

## Hello World

Hello World
```
Would look like this in HTML
```html
<h1>Hello World</h1>

<h2>Hello World</h2>

<p>Hello World</p>
```
And would render like this
# Hello World
## Hello World
Hello World

There are other things you can do with text.

* For **bold** text we can write `**BOLD TEXT**`
* For ~~strikethrough~~ text we can write `~~STRIKE~~`
* For *italics* then we can write `ITALICS`

### Images and links
For links we use `[]()` syntax to make a link. For example if I want to
link to the University of Glasgow website we would write down this

```markdown
[Glasgow University](https://www.gla.ac.uk)
```
In the HTML file it will render like this:

[Glasgow University](https://www.gla.ac.uk)

For images the syntax is similar to the links we use the `![]()`

For example we would need to write this
```markdown
![Alternative Text](IMAGE ADDRESS HERE)
```

### Ordered and Unordered Lists
For an unordered list then all you need to do
is enter an asterix for every term. For example:

```markdown
* Hello
* World
```
Would render as
* Hello
* World

For ordered list you simply use numbers for example
```markdown
1. Hello
2. World
```
Would render as 
1. Hello
2. World

### Tables
For tables there is another piece of useful markdown syntax. In order to write a table
just use this syntax here

```markdown
| Hello | World |
|:------|------:|
|Hello  |World  |
```
This would render as
| Hello | World |
|:------|------:|
|Hello  |World  |

## Custom Folder Files


### tutorials.md

For tutorials you must include all of the text for each tutorial in the **tutorials.md** file. In the previous edition we had a tutorials directory where each tutorial page would have its own markdown file e.g. **1.md, 2.md, 3.md etc**. Now with the tutorials.md file you simply need to type in `##NEXT##` to split up the file. For example a tutorials.md file should look like this

```markdown
# Tutorial 1

Tutorial 1 Stuff
##NEXT##
# Tutorial 2

Tutorial 2 Stuff
##NEXT##
# Tutorial 3

Tutorial 3 Stuff
```

The markdown is rendered using the showdown library. Therefore every part of markdown that showdown supports is supported with GIJOE. For a list of markdown syntax that is supported, check out the [Showdown Documentation](http://demo.showdownjs.com).

### settings.json

For creating labs we have the **settings.json** file to help you choose how you want your labs to be carried out. The settings.json should look like this:

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

### The initialcode.js file

This is the new file for including the start of the exercise code. Following on from the fact that the tutorials would come from one file we thought it would be best if the same happened to the js files. The savefile directory will soon be moving out from the custom folder. All you have to do is write some Javascript code in the initialcode.js file and to seperate it by typing `/* <!-- NEXT --> */`. This will tell gijoe when the javascript will move on to the next file. An example initialcode.js file should look something like this:

```javascript
// GENERIC INITIALCODE FILE
log("Hello World");

/* <!-- NEXT --> */

log(1);

/* <!-- NEXT --> */

WebGLShaderPrecisionFormat;
```