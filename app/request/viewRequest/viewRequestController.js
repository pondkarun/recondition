'use strict'

app.controller("viewRequestController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function ($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSave = {};
        this.listType = [];



        this.init = function () {
            _this.typePage = $routeParams;
            getTypeInventory();
            getRequestIT(_this.typePage.ID)
        }


        this.cancelForm = () => {
            $location.path("inventory");
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

        const getRequestIT = (ID) => {
            console.log("getRequestIT ID", ID);
        }


    }

]);