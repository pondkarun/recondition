'use strict'

app.controller("usersController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function ($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSearch = {
            Name: null,
            EMPLOYEE_CODE: null,
        };
        _this.ID = userService.getID();

        this.init = function () {
            getTypeInventory();
            _this.searchUsers();
        }

        this.gridOptions = {
            gridID: 'gridSearchDevice',
            dataSource: new kendo.data.DataSource({ data: [], pageSize: 10 }),
            sortable: true,
            pageable: true,
            columns: [{
                field: "EMPLOYEE_CODE",
                title: "ID",
                attributes: {
                    class: "text-center"
                }
            },

            {
                field: "Name",
                title: "Name",
                attributes: {
                    class: "text-center"
                }
            },

            {
                field: "DEPARTMENT",
                title: "Department",
                attributes: {
                    class: "text-center"
                }
            },

           
            ],
            management: false,
            operation: {
                view: false,
                del: false,
                edit: false
            },
            showIndex: false,
        };
       
        this.addUsers = () => {
            $location.path("users" + "/add/" + 0);
        }

        const getTypeInventory = () => {
            $http.get(webURL.webApi + "inventory/getTypeInventoryService.php").then((res) => {
                $scope.listType = res.data
            }).catch((err) => {
                console.log("Error");
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        this.searchUsers = () => {
            // console.log("modelSearch", _this.modelSearch);
            loading.open();
            $http.post(webURL.webApi + "user/searchUsersService.php", _this.modelSearch).then((res) => {
                // console.log("res.data", res.data);

                res.data.filter((e) => {
                    e.PurchaseDate = commonService.formatDate(e.PurchaseDate)
                    e.STATUS = (e.STATUS == 'ใช้งาน') ? "Active" : "Inactive";
                    if (e.DisposedDate && e.DisposedDate != "0000-00-00") {
                        e.DisposedDate = commonService.formatDate(e.DisposedDate)
                    } else {
                        e.DisposedDate = "-"
                    }
                })

                _this.gridOptions.dataSource.data(res.data);
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        this.clearUsers = () => {
            this.modelSearch = {
                Name: null,
                EMPLOYEE_CODE: null,
            };
            _this.searchUsers();
        }

        //************dialog func***************//

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

        function showConfirmBox(msg, okCallback, cancelCallback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.confirm(okCallback, cancelCallback, dialog);
        }

        //************end dialog func***************//
    }

]);