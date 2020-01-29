'use strict'

app.controller("loginController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http',
    function($scope, $rootScope, $location, $routeParams, userService, $http) {

        $scope.model = {
            USERNAME: null,
            PASSWORD: null
        }

        this.init = function() {}

        $scope.login = () => {
            loading.open();
            console.log("login", $scope.model);
            $http.post("./api/login/loginService.php", $scope.model).then((res) => {
                console.log("res.data", res.data);
            }).catch((err) => {
                console.log("Error");
            }).finally(() => {
                loading.close();
            });

            // userService.saveData(res.data);
            // 
            // 
        }


    }
]);