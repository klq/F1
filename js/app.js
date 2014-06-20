(function(){
    var app = angular.module('F1App', []);

    app.controller('RankController', function($scope, $http){
        $scope.dateNow = Date.now();
        $scope.nameFilter = null;

        $scope.init = function () {            
            $scope.driver_standings = [];
            $scope.team_standings = [];
            
            //Driver API Call
            $http.jsonp('http://ergast.com/api/f1/current/driverStandings'+ '.json?callback=JSON_CALLBACK').success(function(data){
                $scope.season = data.MRData.StandingsTable.StandingsLists[0].season;
                $scope.round = data.MRData.StandingsTable.StandingsLists[0].round;

                angular.forEach(data.MRData.StandingsTable.StandingsLists[0].DriverStandings, function(value, index) {
                    var standing = value;
                    $scope.driver_standings.push(standing);   
                });
            }).error(function(error){
            });

            //Team API Call
            $http.jsonp('http://ergast.com/api/f1/current/constructorStandings'+ '.json?callback=JSON_CALLBACK').success(function(data){

                angular.forEach(data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings, function(value, index) {
                    var standing = value;
                    $scope.team_standings.push(standing);   
                });
            }).error(function(error){
            });
        };
        
    });

    app.controller('PanelController', function($scope){
        $scope.tab = 1;
        $scope.setTab = function(setTab) {
            $scope.tab = setTab;
        };
        $scope.isTab = function(checkTab) {
            return $scope.tab === checkTab;
        };
    });



})();