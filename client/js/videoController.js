/**
 * Created by Jacob on 6/19/14.
 */
function VideoController($scope, $http)
{
    $scope.formData = {};

    $http.get('http://localhost:1400/videos')
        .success(function (response)
        {
            $scope.videos  = response;
        });

    $scope.addVideo = function()
    {
       /* var formData = {
            'videoID': $scope.videoID,
            'category': $scope.videoCategory,
            'rating': $scope.videoRating
        };*/

        console.log("form data = " +  $.param($scope.formData));
        $http({
            url: 'http://localhost:1400/videos/addVideo',
            method: "POST",
            data: $.param($scope.formData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
           console.log("success!!")
            $scope.message = data;
            $('#message').removeClass('text-error');
            $('#message').addClass('text-success');
            $http.get('http://localhost:1400/videos')
                .success(function (response)
                {
                    $scope.videos  = response;
                });
        }).error(function(data, status, headers, config) {
            $scope.message = data;
            $('#message').removeClass('text-success');
            $('#message').addClass('text-error');
        });
    }
}
