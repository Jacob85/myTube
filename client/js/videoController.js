/**
 * Created by Jacob on 6/19/14.
 */
function VideoController($scope, $http)
{
/*    $.ajax({
        url: 'http://localhost:63342/videos',
        type: 'GET',
        dataType: 'jsonp',
        success: function(result)
        {
            $scope.videos  = result;
        }
    });*/

    $http.get('http://localhost:1400/videos')
        .success(function (response)
        {
            $scope.videos  = response;
        });

}
