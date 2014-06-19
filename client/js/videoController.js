/**
 * Created by Jacob on 6/19/14.
 */
function VideoController($scope, $http)
{
    $scope.formData = {};
    $scope.formGetByData = {};
    $scope.formEditData ={};
    $http.get('http://localhost:1400/videos')
        .success(function (response)
        {
            $scope.videos  = response;
        });

    $scope.editModel = function(video){
        /*this function is being called every time the edit button pressed
        * this function update the global variable videoBeingEdit*/
        $scope.videoBeingEdit = video;
     };

    $scope.editVideo = function()
    {
        console.log("form data = " +  $.param($scope.videoBeingEdit));
        $http({
            url: 'http://localhost:1400/videos',
            method: 'PUT',
            data: $.param($scope.videoBeingEdit),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success (function(data, status, headers, config){
            handleSuccessMessage($scope, data);
            $('#editModel').modal('toggle');
            /*No need to reload data (data is already bind :) )*/
        }).error(function(data, status, headers, config){
            handleErrorMessage($scope, data);
        });
    };

    $scope.getBy = function()
    {
        var url;
        if ($scope.formGetByData.getBy == "Id")
            url = 'http://localhost:1400/videos/getVideo/' + $scope.formGetByData.userInput;
        else if ($scope.formGetByData.getBy == "Category")
            url = "http://localhost:1400/videos/getVideo/byCategory?category=" + $scope.formGetByData.userInput;
        else{
            handleErrorMessage($scope, "unKnow Selection made");
            return;
        }
        $http.get(url)
            .success(function (response){
                $scope.videos  = response;
            }).error(function(data){
                handleErrorMessage($scope, data);
            });
    };


    $scope.remove = function(video)
    {
        console.log("running delete query in for video id: " + video.videoId );
        $http({
            url: 'http://localhost:1400/videos/'+ video.videoId,
            method: 'DELETE'
        }).success (function(data, status, headers, config){
            handleSuccessMessage($scope, data);
            /*remove th item from the videos array*/
            var index = $scope.videos.indexOf(video)
            $scope.videos.splice(index, 1);

        }).error(function(data, status, headers, config){
            handleErrorMessage($scope, data);
            });
    };

    $scope.addVideo = function()
    {
        console.log("form data = " +  $.param($scope.formData));
        $http({
            url: 'http://localhost:1400/videos/addVideo',
            method: "POST",
            data: $.param($scope.formData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
           console.log("success!!")
            handleSuccessMessage($scope, data);
            $http.get('http://localhost:1400/videos')
                .success(function (response)
                {
                    $scope.videos  = response;
                });
        }).error(function(data, status, headers, config) {
            handleErrorMessage($scope, data);
        });
    }
}


/**
 * Generic function for display error message to the screen
 * @param $scope the controller scope
 * @param data the data return from the server
 */
function handleErrorMessage($scope, data)
{
    $scope.message = data;
    $('#message').removeClass('text-success');
    $('#message').addClass('text-error');
}
/**
 * Generic function for display success message to the screen
 * @param $scope the controller scope
 * @param data the data return from the server
 */
function handleSuccessMessage($scope, data)
{
    $scope.message = data;
    $('#message').removeClass('text-error');
    $('#message').addClass('text-success');
}
