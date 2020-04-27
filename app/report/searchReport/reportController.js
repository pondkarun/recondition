'use strict'

app.controller("reportController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSearch = {
            START_DATE: null,
            END_DATE: null
        };
        _this.ID = userService.getID();

        this.init = function() {
            _this.searchReport();
        }

      

        this.searchReport = () => {
             console.log("modelSearch", _this.modelSearch);
            loading.open();
            $http.post(webURL.webApi + "report/reportService.php", _this.modelSearch).then((res) => {
                console.log("res.data", res.data);
                res.data[0].filter(e => e.AVG = e.AVG ? e.AVG : 0) 
                this.listReport1 = res.data[0]
                this.listReport2 = res.data[1]
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        this.clearReport = () => {
            this.modelSearch = {
                START_DATE: null,
                END_DATE: null
            };
            _this.searchReport();
        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

        $scope.printDiv = () => {
            var divToPrint = document.getElementById("printTable");
            var newWin = window.open("");
            newWin.document.write(divToPrint.outerHTML);
            newWin.print();
            newWin.close();
        }

        $scope.printDiv2 = () => {
            var divToPrint = document.getElementById("printTable2");
            var newWin = window.open("");
            newWin.document.write(divToPrint.outerHTML);
            newWin.print();
            newWin.close();
        }


    }

]);