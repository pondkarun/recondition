'use strict'
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
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "account",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/account');
                        }
                    })
                }
            },
        },
    }).when("/inventory", {
        templateUrl: "app/inventory/searchInventory/template/inventory.html",
        controller: "inventoryController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "inventory",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/account');
                        }
                    })
                }
            },
        },
    }).when("/inventory/:type/:ID", {
        templateUrl: "app/inventory/addEditInventory/template/addEditInventory.html",
        controller: "addEditInventoryController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "inventory",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/account');
                        }
                    })
                }
            },
        },
    }).when("/device", {
        templateUrl: "app/device/searchDevice/template/device.html",
        controller: "deviceController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "device",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/account');
                        }
                    })
                }
            },
        },
    }).when("/device/add/:ID", {
        templateUrl: "app/device/addEditDevice/template/addEditDevice.html",
        controller: "addEditDeviceController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "device",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/account');
                        }
                    })
                }
            },
        },
    }).otherwise({ redirectTo: '/account' });
});



var checkPermission = function(authService) {
    authService.checkPermission();
}