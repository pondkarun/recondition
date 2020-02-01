'use strict'

app.controller("appController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http',
    function($scope, $rootScope, $location, $routeParams, userService, $http) {
        $scope.menuShow = [];
        this.init = () => {

        }

        $scope.showMenu = () => {
            if (!userService.isUserLoggedIn()) {
                localStorage.removeItem("login");
                $location.path("login");
            }
            return userService.isUserLoggedIn()
        }

        $scope.logOut = () => {
            location.reload();
            localStorage.removeItem("login");
            $location.path("login");
        }

        /** เรียก sidebar */
        $rootScope.getMenu = () => {
            $scope.menuShow = [];
            loading.open();
            let StatusID = userService.getStatusID()
            $http.post(webURL.webApi + "menu/menuService.php", StatusID).then((res) => {
                // console.log("res.data", res.data);
                for (let i = 0; i < res.data.length; i++) {
                    $scope.menuShow.push(res.data[i]);
                }
                console.log("$scope.menuShow", $scope.menuShow);
                loading.close();
            }).catch((err) => {
                loading.close();
                console.log("Error");
            })
        }

        if (userService.isUserLoggedIn()) {
            $rootScope.getMenu();
        }
        // $scope.$watch($scope.menuShow, function(newValue, oldValue) {
        //     console.log("menuShow", $scope.menuShow);
        //     $scope.menuShow = $scope.menuShow;
        // });

    }
]);

/** 
    $scope.test = function() {
        $location.path("demo" + "/156");
    }
    $scope.menuId = parseInt($routeParams.id);
 */