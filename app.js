/**
 * Simple NodeJS Express app to stand up a static file server.
 * 
 * This will behave similar to a barebones Apache2 server, with the exceptions of 
 * EJS and CORS support out of the box.
 * 
 * This project exists primarily to provide a simpler method of securing a static file
 * server behind a modern authentication provider like Keycloak.  Rather than including
 * a Keycloak.js adapter inside of each page, you can guarantee pre-flight security by
 * protecting resources at the request stage.
 * 
 */
const fs = require("fs");
const cors = require("cors");
const express = require('express');

// Align PORT to an environment variable for Docker configuration
const PORT = (process.env.PORT || 3000);
const exts = [".html", ".htm"]

// Create an instance of the express class and declare our port
const app = express();

// Set EJS as our view engine for partial templates
app.set("view engine", "ejs");
app.set('json spaces', 2);

// Enable CORS
app.use(cors())

// We'll handle this in about the most naive way possible.
app.get("*", function (req, res, next) {

    // Pull from our content parent folder
    let query = (req.url.includes("?")) ? "?" + req.url.split("?")[1] : "";
    let path = (req.url.includes("?")) ? req.url.split("?")[0] : req.url;
    let root = __dirname + "/files"

    // Check if we've somehow requested an EJS file manually.  If this happens, then the 
    // browser doesn't natively know how to handle that.
    //
    // We can either specify that in a response header or change the path here.
    //
    if (path.toLowerCase().endsWith(".ejs"))
        path = path.substr(0, path.length - 4)

    // The first pass below will be checking whether or not a valid EJS file exists
    // for the request.
    let pathEJS = (path.endsWith("/")) ? path + "index.ejs" : path + ".ejs";
    let pathDefault = (path.endsWith("/")) ? path + "index.html" : path;

    // The rest is straightforward.  We're just checking if a file exists here and rendering
    // any EJS we find.
    fs.exists(root + pathEJS, function (exists) {
        if (exists) {
            res.render(path);
        } else {
            checkPath(root, pathDefault, query, res, next);
        }
    });
});

// Check this path for regular, local files.  
// 
function checkPath(root, path, query, res, next) {
    fs.exists(root + path, function (exists) {
        if (exists) {

            // If something exists at this path, we will first need to know
            // whether we're dealing with a regular file or a directory.
            //
            // If it's a directory, then we have a special handler for that situation,
            // whereas files can be returned as-is.
            //
            fs.stat(root + path, function(err, stats){
                if (stats.isDirectory()) {
                    handleDirectory(root, path, query, res, next);
                }
                else {
                    res.sendFile(root + path);
                }
            });
        }
        else {
            next();
        }
    })
}

// If we got a directory, then we'll check if we can return some sort of index file
// in its place.  We will use the extensions defined at the top.
// 
function handleDirectory(root, path, query, res, next) {

    // If we thought this was a directory but aren't using a closing / at the end,
    // then relative resources won't be returned correctly.
    //
    if (path.endsWith("/") == false) {
        res.redirect(path + "/" + query)
        return;
    }
    
    // Here, we'll check to see if anything matches the index.* format we're allowing
    // with the extensions. 
    //
    fs.readdir(root + path, function(err, files){
        
        let found = false;
        for (let ext in exts) {
            if (files.includes("index" + ext)) {
                res.sendfile(root + path + "index" + ext + query)
                return;
            }
        }
        if (found == false)
            next();
    });
}

// If they didn't supply an index.html themselves, use the backup
app.get("/", function(req, res, next){
    res.render("index", {
        
    });
});

// If we're still here, we didn't find anything
//
app.get("*", function(req, res, next){
    res.status(404).render("404", {
        path: req.url
    });
});

// Start the server
app.listen(PORT, function () {
    console.log(`\n[Server] listening on port ${PORT} ...`)
});