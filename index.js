'use strict'

app.controller("appController", ['$scope', '$rootScope', '$location', '$routeParams',
    function($scope, $rootScope, $location, $routeParams) {
        $scope.test = function() {
            $location.path("demo" + "/156");
        }
        let sd = false
        $scope.menuId = parseInt($routeParams.id);
        // console.log("this.menuId ", $scope.menuId);
    }
]);