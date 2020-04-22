'use strict'

app.controller("addEditUsersController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings',
    function ($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings) {
        let _this = this;
        $scope.modelSave = {
            PREFIX_ID: null,
            NAME_TH: null,
            SURNAME_TH: null,
            DEPARTMENT: null,
            LOCATION: null,
            EMAIL: null,
            NICKNAME: null,
            IPAddress: null,
            TEL: null,
            STATUS_ID: null
        };
        _this.ID = userService.getID();
        this.init = function () {
            // getUserProfile(_this.ID) //edit
        }
        $scope.saveForm = () => {
            console.log("modelSave", $scope.modelSave);
            loading.open();
            $http.post(webURL.webApi + "user/addUsersService.php", $scope.modelSave).then((res) => {
                // console.log("res.data", res.data);
                showAlertBox(msgSettings.msgSaveSucc, null);
                $location.path("users");
                loading.close();
            }).catch((err) => {
                loading.close();
                console.log("Error");
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        const getUserProfile = (ID) => {
            loading.open();
            $http.post(webURL.webApi + "user/userProfileService.php", ID).then((res) => {
                // console.log("res.data", res.data);
                if (res.data.status == 200) {
                    $scope.modelSave = res.data
                } else {
                    console.log("Error");
                    showAlertBox(msgSettings.msgTryAgain, null);
                }
                // console.log("$scope.modelSave", $scope.modelSave);
                loading.close();
            }).catch((err) => {
                loading.close();
                console.log("Error");
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        this.cancelForm = () => {
            $location.path("users");
        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

        function saveData(item) {
            loading.open();
            $http.post(webURL.webApi + "user/editUserProfileService.php", item).then((res) => {
                //console.log("res.data", res.data);
                showAlertBox(msgSettings.msgSaveSucc, null);
            }).catch((err) => {
                loading.close();
                showAlertBox(msgSettings.msgNotSave, null);
            }).finally(() => {
                loading.close();
                let ID = userService.getID();
                getUserProfile(_this.ID)
            });

        }
    }

]);