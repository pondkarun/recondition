'use strict'
//demo
app.config(function ($routeProvider) {
    $routeProvider
        .when("/demoFormInput", {
            templateUrl: "app/demoFormInput/template/input-form.html",
            controller: "appController"
        })
        .when("/demo/:id", {
            templateUrl: "app/demoFormInput/template/input-form.html",
            controller: "appController"
        })
        .otherwise({ redirectTo: '/demoFormInput' });
});



var checkPermission = function (authService) {
    authService.checkPermission();
}

