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
            let log = localStorage.getItem("login");
            // console.log("login", $scope.model);
            $http.post(webURL.webApi + "login/loginService.php", $scope.model).then((res) => {

                console.log("res.data", res.data);
                if (res.data.statusLogin == 'loggedin') {
                    userService.saveData(res.data);
                    $location.path("demo" + "/156");
                } else {
                    alert('invalid login');
                }
            }).catch((err) => {

            }).finally(() => {
                loading.close();
            });

        }


    }
]);