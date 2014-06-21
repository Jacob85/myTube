/**
 * Created by Jacob on 6/18/14.
 * This file config the Schema we are using in order to save the video record to db
 */

module.exports = {
    getVideoSchema: function videoSchema(myTube)
    {
        return myTube.mongoose.Schema(
            {
                videoId:String,
                videoTitle:String,
                videoDescription:String,
                videoImageUrl:String,
                videoViewCount:Number,
                videoLikeCount:Number,
                VideoDislikeCount:Number,
                VideoCategory:String,
                VideoRating:Number
            } 
        );
    },
    getDetailsAsString: function ()
    {
        return function(){
                "videoId " + this.videoId +
                "videoTitle " + this.videoTitle +
                " videoDescription" + this.videoDescription +
                " videoImageUrl" + this.videoImageUrl +
                " videoViewCount" + this.videoViewCount +
                " videoLikeCount" + this.videoLikeCount +
                " VideoDislikeCount" + this.VideoDislikeCount +
                " VideoCategory" + this.VideoCategory +
                " VideoRating" + this.VideoRating;
        }

    }
      
};