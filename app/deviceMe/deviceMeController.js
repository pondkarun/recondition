'use strict'

app.controller("deviceMeController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings',
    function ($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings) {
        let _this = this;
        $scope.modelSave = {};
        _this.ID = userService.getID();

        this.init = function () {
            getUserProfile(_this.ID)
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
                loading.close();
            }).catch((err) => {
                loading.close();
                console.log("Error");
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }


        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }


    }

]);