'use strict'

app.controller("accountController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings) {
        $scope.modelSave = {};

        this.init = function() {
            let ID = userService.getID();
            getUserProfile(ID)
        }
        $scope.saveForm = () => {
            //loading.open();
            $scope.modelSave.PASSWORD_NEW = md5($scope.modelSave.PASSWORD);
            if (!$scope.modelSave.PASSWORD_NEW || !$scope.modelSave.PASSWORS_CON) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else if ($scope.modelSave.PASSWORD_NEW != $scope.modelSave.PASSWORD_OLD) {
                showAlertBox(msgSettings.msgErrPassword, null);
            } else if ($scope.modelSave.PASSWORD_NEW != $scope.modelSave.PASSWORS_CON) {
                showAlertBox(msgSettings.msgUnlikePassword, null);
            } else {

            }

        }

        const getUserProfile = (ID) => {
            loading.open();
            $http.post(webURL.webApi + "user/userProfileService.php", ID).then((res) => {
                // console.log("res.data", res.data);
                if (res.data.status == 200) {
                    $scope.modelSave = res.data
                } else {
                    console.log("Error");
                }
                console.log("$scope.modelSave", $scope.modelSave);
                loading.close();
            }).catch((err) => {
                loading.close();
                console.log("Error");
            })
        }


        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }
    }

]);