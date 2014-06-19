/**
 * Created by Jacob on 6/18/14.
 */

/*our namespace */
var myTube = {};

/*constants variables */
myTube.youtubeKey = "AIzaSyDRBeSZkyZjv7AbhXAaGujrDYdPNPmFBEY";
myTube.youtubeQueryString = "https://www.googleapis.com/youtube/v3/videos?id={VideoId}&key={YourKey}&part=snippet,statistics";

/*node Js dependencies */
myTube.mongoose = require('mongoose');
myTube.restify = require('restify');
myTube.request = require('request');
myTube.restfulController = require("./restifyController");
myTube.mongoConfig = require("./mongoConfig");

/*create server and start listen*/
myTube.server = myTube.restify.createServer({ name : "music"});
myTube.server.listen(1400 ,'localhost', function(){
    console.log('%s listening at %s ', myTube.server.name ,
        myTube.server.url);
});
myTube.server.use(myTube.restify.fullResponse());

/*Connect to the remote mongo db and save the connection*/
myTube.mongoose.connect('mongodb://admin:123456@ds039778.mongolab.com:39778/music');
myTube.connection = myTube.mongoose.connection;
myTube.videoSchema = myTube.mongoConfig.getVideoSchema(myTube);
myTube.videoSchema.methods.getDetailsAsString =  function(){
    "videoId " + this.videoId +
        "videoTitle " + this.videoTitle +
        " videoDescription" + this.videoDescription +
        " videoImageUrl" + this.videoImageUrl +
        " videoViewCount" + this.videoViewCount +
        " videoLikeCount" + this.videoLikeCount +
        " VideoDislikeCount" + this.VideoDislikeCount +
        " VideoCategory" + this.VideoCategory +
        " VideoRating" + this.VideoRating;
};/* myTube.mongoConfig.getDetailsAsString();*/
myTube.Video = myTube.mongoose.model('videos', myTube.videoSchema);

myTube.restfulController.config(myTube, myTube.server, "/videos");

