﻿'use strict'
//demo
app.config(function($routeProvider, $mdDateLocaleProvider) {

    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD-MM-YYYY') : '';
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD-MM-YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

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
        templateUrl: "app/inventory/searchInventory/template/inventory.html",
        controller: "inventoryController",
        resolve: {
            check: function($location, userService) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                }
            },
        },
    }).when("/inventory/:type/:ID", {
        templateUrl: "app/inventory/addEditInventory/template/addEditInventory.html",
        controller: "addEditInventoryController",
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