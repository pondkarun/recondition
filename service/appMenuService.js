'use strict'
//demo
app.config(function($routeProvider) {
    $routeProvider


        .when("/demoFormInput", {
            templateUrl: "app/demoFormInput/template/input-form.html",
            controller: "appController"
        })
        .when("/demo/:id", {
            templateUrl: "app/demoFormInput/template/input-form.html",
            controller: "appController"
        })
        .when("/login", {
            templateUrl: "app/login/template/login.html",
            controller: "loginController"
                // resolve: {
                //     factory: checkPermission
                // }
        })
        .otherwise({ redirectTo: '/login' });
});



var checkPermission = function(authService) {
    authService.checkPermission();
}