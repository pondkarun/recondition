'use strict'

app.controller("addEditDeviceController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function ($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSave = [];
        $scope.listType = [];
        $scope.model = {};
        this.typePage = {}


        this.init = function () {
            checkRouteParams()
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
            if (!$scope.projectForm.$valid) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {

            }
        }
        this.cancelForm = () => {
            $location.path("device");
        }

        this.saveForm = () => {
            console.log("modelSave", _this.modelSave);
            if (_this.modelSave.length <= 0) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {

                // $http.post(webURL.webApi + "inventory/addInventoryService.php", _this.modelSave).then((res) => {
                //     // console.log("res.data", res.data);
                //     showAlertBox(msgSettings.msgSaveSucc, null);
                // }).catch((err) => {
                //     showAlertBox(msgSettings.msgNotSave, null);
                // }).finally(() => {
                //     $location.path("inventory");
                // });

            }
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
                $scope.model.PurchaseDate = new Date();
                $scope.model.STATUS = "ใช้งาน";
            }
        }

        const getUser = () => {
            loading.open();
            $http.get(webURL.webApi + "inventory/getTypeInventoryService.php").then((res) => {
                // console.log("res.data", res.data);
                loading.close();
                $scope.listType = res.data
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        const getInventory = () => {
            loading.open();
            $http.get(webURL.webApi + "inventory/getTypeInventoryService.php").then((res) => {
                // console.log("res.data", res.data);
                loading.close();
                $scope.listType = res.data
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }





    }

]);