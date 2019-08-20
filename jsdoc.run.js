var util = require('util')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout) }
const open = require('open');

var os = require('os');

if (os.type() === 'Linux') {
    console.log("Linux not supported for fancy scripting!")
} else if (os.type() === 'Darwin') {
    console.log("Opening JSDocs for mac...");
    open(__dirname + "./doc/index.html"); 
} else if (os.type() === 'Windows_NT') {
    console.log("Opening JSDocs for windows...");
    exec("start ./doc/index.html", puts);
} else {
    throw new Error("Unsupported OS found: " + os.type());
}