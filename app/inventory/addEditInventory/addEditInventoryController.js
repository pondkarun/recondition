'use strict'

app.controller("addEditInventoryController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings) {
        let _this = this;
        $scope.modelSave = {};
        _this.ID = userService.getID();

        this.init = function() {
            alert("เพิ่ม");
            // $scope.menuId = parseInt($routeParams.id);
        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }


    }

]);