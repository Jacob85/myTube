
/**
 * This code will run as a simple web server to display the client side of the application
 * This part will communicate with the RESTful part of the project*/

/*our namespace */
var myTubeWebServer = {};

myTubeWebServer.http = require("http");
myTubeWebServer.path = require("path");
myTubeWebServer.express = require("express");
myTubeWebServer.router = myTubeWebServer.express();
myTubeWebServer.server = myTubeWebServer.http.createServer(myTubeWebServer.router);
myTubeWebServer.router.use(myTubeWebServer.express.static(myTubeWebServer.path.resolve(__dirname, 'client')));
myTubeWebServer.server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    console.log("Web Server is listen");
});