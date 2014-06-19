/**
 * Created by Jacob on 6/18/14.
 */

var myTube;
module.exports = {
    /**
     * config the restful web service and its specific methods
     * @param server the server to config
     * @param path  the path to config
     */
    config: function (myTubes,server, path)
    {
        server.use(myTubes.restify.queryParser());
        server.use(myTubes.restify.bodyParser());
        server.get(path+'/getVideo/byCategory', findVideosBYCategory);
        server.get(path+'/getVideo/:videoID', findVideo);
        server.post(path+'/addVideo', addVideo);
        server.get(path,findVideos);
        server.del(path+'/:videoID', deleteVideo);
        server.put(path, updateVideo);
        /*for cross domain support*/
        server.on('MethodNotAllowed', unknownMethodHandler);
        myTube = myTubes;
    }
};
function updateVideo(req, res, next)
{
    console.log("update Video called");
    /*check if the video exists in the db*/
    myTube.Video.find({videoId:req.params.videoId}, function(error,videos){
        if (error)
        {
            /*error in find*/
            console.log("error in find method");
            res.send(500, "Internal error while querying the database");
        }
        else
        {
            if (videos.length == 0)
            {
                /*video does not exists in db*/
                console.log("Video does not exists in db cannot update it");
                res.send(403,"Video does not exists in db cannot update it...");

            }
            else
            {
                /*video was found in db*/
                var update = {
                    VideoCategory: req.params.VideoCategory,
                    VideoRating: req.params.VideoRating
                }
                console.log("run update update with params: " + update);
                genericUpdate(res, next, {videoId:req.params.videoId}, update);
            }
        }
    });

}
function findVideosBYCategory(req, res, next)
{
    console.log("findVideosBYCategory was called");
    if (req.params.sorted == 'true')
        genericVideoSearch(res, next, {$query: {VideoCategory:req.params.category}, $orderby: {VideoRating : -1}});
    else
        genericVideoSearch(res, next, {VideoCategory:req.params.category});
}

function findVideo(req, res, next)
{
    genericVideoSearch(res, next, {videoId:req.params.videoID});
}

function findVideos(req,res,next)
{
    genericVideoSearch(res, next, {});
}

/**
 * This function gets a query object to query the database with it
 * if error occurs the method returns status code 500 with an error message
 * if the query passed it return the result found as an array
 * Notice, the response could be an empty array
 * @param res response object
 * @param next next object
 * @param query query object - this object wil be sent to the find method
 */
function genericVideoSearch(res, next, query)
{
    myTube.Video.find(query, function(error, videos){
        if (error)
        {
            res.send(500, "error while querying the db");
            next();
        }
        else
        {
            res.send(200,  videos);
        }
    });

}
function genericUpdate(res, next, query, update)
{
    myTube.Video.update(query, update, function(error){
        if (error)
        {
            res.send(500, "error while Saving document to the db");
            next();
        }
        else
        {
            res.send(200, "Item was updated in db");
            next();
        }
    });
}
function deleteVideo(req,res,next)
{
    myTube.Video.remove({videoId:req.params.videoID}, function(error){
       if (error)
       {
           res.send(500, "Error while trying to delete");
       }
        else
       {
           res.send(200, "video was successfully deleted from db");
       }
    });
}


function addVideoToDb(req, res, next) {
    /*construct the query string*/
    var queryString = myTube.youtubeQueryString.replace("{VideoId}", req.params.videoID);
    queryString = queryString.replace("{YourKey}", myTube.youtubeKey);
    myTube.request(queryString, function(error, respons, body){
        var respJson = JSON.parse(body);
        var videoToAdd = new myTube.Video(
            {
                videoId:req.params.videoID,
                videoTitle:respJson.items[0].snippet.title,
                videoDescription:respJson.items[0].snippet.description,
                videoImageUrl:respJson.items[0].snippet.thumbnails.default.url,
                videoViewCount:respJson.items[0].statistics.viewCount,
                videoLikeCount:respJson.items[0].statistics.likeCount,
                VideoDislikeCount:respJson.items[0].statistics.dislikeCount,
                VideoCategory:req.params.category,
                VideoRating:req.params.rating
            }
        );
        videoToAdd.save(function(error,prod) {
            if(error) {
                res.send(200, "error While Saving: ");
                next();
            }
            else {
                console.log("videoToAdd was saved to mongodb");
                res.send(200, "video was saved: " +videoToAdd.videoTitle);
                next();
            }
        });

    });
}
function addVideo(req,res,next)
{
    /*check if the video exists in the db*/
    myTube.Video.find({videoId:req.params.videoID}, function(error,videos){
        if (error)
        {
            /*error in find*/
            console.log("error in find method");
            res.send(500, "Internal error while querying the database");
        }
        else
        {
            if (videos.length == 0)
            {
                /*video does not exists in db*/
                addVideoToDb(req, res, next);
            }
            else
            {
                /*video was found in db*/
                console.log("Video already exists does not add it");
                res.send(403,"video is already exists in db...");
            }
        }
    });
}
function unknownMethodHandler(req, res) {
    if (req.method.toLowerCase() === 'options') {
        console.log('received an options method request');
        var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With']; // added Origin & X-Requested-With

        if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Origin', req.headers.origin);

        return res.send(204);
    }
    else
        return res.send(new myTube.restify.MethodNotAllowedError());
}