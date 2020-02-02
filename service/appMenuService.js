'use strict'
//demo
app.config(function($routeProvider) {
    $routeProvider.when("/demoFormInput", {
        templateUrl: "app/demoFormInput/template/input-form.html",
        controller: "appController",
        resolve: {
            check: function($location, userService) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                }
            },
        },
    }).when("/demo/:id", {
        templateUrl: "app/demoFormInput/template/input-form.html",
        controller: "appController",
        resolve: {
            check: function($location, userService) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                }
            },
        },
    }).when("/login", {
        templateUrl: "app/login/template/login.html",
        controller: "loginController",
        resolve: {
            check: function($location, userService) {
                if (userService.isUserLoggedIn()) {
                    $location.path("account");
                }
            },
        },
    }).when("/account", {
        templateUrl: "app/account/template/account.html",
        controller: "accountController",
        resolve: {
            check: function($location, userService) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                }
            },
        },
    }).when("/inventory", {
        templateUrl: "app/inventory/template/inventory.html",
        controller: "inventoryController",
        resolve: {
            check: function($location, userService) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                }
            },
        },
    }).otherwise({ redirectTo: '/inventory' });
});



var checkPermission = function(authService) {
    authService.checkPermission();
}