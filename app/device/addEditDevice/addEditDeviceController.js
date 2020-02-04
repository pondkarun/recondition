'use strict'

app.controller("addEditDeviceController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSaveAdd = [];
        this.model = {};
        this.typePage = {};
        this.Inventory = [];
        this.Users = [];



        this.init = function() {
            checkRouteParams()
            if ($scope.typeAdd) {
                getUsers();
                getInventory();
            }
        }

        this.gridOptions = {
            gridID: 'gridSearchDevice',
            dataSource: new kendo.data.DataSource({ data: [], pageSize: 10 }),
            sortable: true,
            pageable: true,
            columns: [

                {
                    field: "TYPE_NAME",
                    title: "Type",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "BRAND",
                    title: "Brand",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "MODEL",
                    title: "Model",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "SERIAL",
                    title: "Serial",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "PurchaseDate_NAME",
                    title: "Purchase Date",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "DisposedDate_NAME",
                    title: "Disposed Date",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "STATUS",
                    title: "Status",
                    attributes: {
                        class: "text-center"
                    }
                }
            ],
            management: true,
            operation: {
                view: false,
                del: true,
                edit: false
            },
            showIndex: false,
        };

        //ลบข้อมูลในตาราง
        this.gridCallbackDel = (item) => {
            console.log("item", item);
            // let delIndex = _this.modelSave.findIndex(x => x.arrNumber == item.arrNumber);
            // _this.modelSave.splice(delIndex, 1);
            // _this.gridOptions.dataSource.data(_this.modelSave);
        }

        this.addDevice = () => {
            console.log("model", _this.model);

            if (!$scope.deviceForm.$valid) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {

            }
        }
        this.cancelForm = () => {
            $location.path("device");
        }

        this.saveFormAdd = () => {
            console.log("modelSaveAdd", _this.modelSaveAdd);
            // if (_this.modelSaveAdd.length <= 0) {
            //     showAlertBox(msgSettings.msgValidForm, null);
            // } else {

            //     // $http.post(webURL.webApi + "inventory/addInventoryService.php", _this.modelSaveAdd).then((res) => {
            //     //     // console.log("res.data", res.data);
            //     //     showAlertBox(msgSettings.msgSaveSucc, null);
            //     // }).catch((err) => {
            //     //     showAlertBox(msgSettings.msgNotSave, null);
            //     // }).finally(() => {
            //     //     $location.path("inventory");
            //     // });

            // }
        }



        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

        function checkRouteParams() {
            _this.typePage = $routeParams;
            if (_this.typePage.type == "edit") {
                $scope.typeAdd = false;
                getInventoryEdit(_this.typePage.ID);
            } else {
                $scope.typeAdd = true;
            }
        }

        const getUsers = () => {
            loading.open();
            $http.get(webURL.webApi + "user/getUsersService.php").then((res) => {
                console.log("res.data", res.data);
                _this.Users = res.data
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        const getInventory = () => {
            $http.get(webURL.webApi + "inventory/getInventoryService.php").then((res) => {
                console.log("res.data", res.data);
                _this.Inventory = res.data
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }


        ////////////Auto Complete//////////////////////////////////////

        this.config = {
            isDisabled: false,
            noCache: true,
            selectedItem: null,
        };




        this.selectedItem = (item) => {
            if (item) {
                _this.config.selectedItem = item;
                _this.model.USER_ID = item.ID;
            }
        }



        this.querySearch = (query) => {
            var results = query ? _this.Users.filter(this.createFilterFor(query)) : _this.Users;
            return results;
        }
        this.createFilterFor = (query) => {
            var lowercaseQuery = angular.copy(query);

            return function filterFn(item) {
                return ((item.Name).search(new RegExp('(' + lowercaseQuery + ')', 'gi')) != -1);
            };
        }


        ////////////END Auto Complete//////////////////////////////////////


    }

]);