'use strict'

app.controller("addEditServiceController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSave = {};
        this.listType = [];



        this.init = function() {
            _this.typePage = $routeParams;
            $scope.isAdd = (_this.typePage.Type == "add") ? true : false;
            console.log("$scope.isAdd", $scope.isAdd);

            getTypeInventory();
            getServiceEditView(_this.typePage.ID)
        }


        this.cancelForm = () => {
            $location.path("service");
        }

        this.saveForm = () => {

            if (!$scope.projectForm.$valid) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {
                console.log("modelSave", _this.modelSave);
            }
        }


        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

        const getTypeInventory = () => {
            loading.open();
            $http.get(webURL.webApi + "inventory/getTypeInventoryService.php").then((res) => {
                // console.log("res.data", res.data);
                loading.close();
                _this.listType = res.data
                console.log("listType", _this.listType);
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        const getServiceEditView = (ID) => {
            console.log("getServiceEditView ID", ID);
        }


    }

]);