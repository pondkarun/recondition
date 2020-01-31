'use strict'

app.controller("appController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService',
    function($scope, $rootScope, $location, $routeParams, userService) {

        this.init = () => {
            // getMenu();
        }

        $scope.showMenu = () => {
            if (!userService.isUserLoggedIn()) {
                $scope.logOut()
            }
            return userService.isUserLoggedIn()
        }

        $scope.logOut = () => {
            localStorage.removeItem("login");
            $location.path("login");
        }

        /** เรียก sidebar */
        $rootScope.getMenu = () => {
            let aaa = userService.getStatusID()
            console.log("aaa", aaa);
        }



    }
]);

/** 
    $scope.test = function() {
        $location.path("demo" + "/156");
    }
    $scope.menuId = parseInt($routeParams.id);
 */