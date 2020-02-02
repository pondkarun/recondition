'use strict'

app.controller("addEditInventoryController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSave = [];
        $scope.listType = [];
        $scope.model = {};


        this.init = function() {
            //alert("เพิ่ม");
            // $scope.menuId = parseInt($routeParams.id);
            $scope.model.PurchaseDate = new Date();
            $scope.model.STATUS = "ใช้งาน";
            getTypeInventory();
        }

        this.gridOptions = {
            gridID: 'gridSearchInventory',
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
            // console.log("item", item);
            let delIndex = _this.modelSave.findIndex(x => x.arrNumber == item.arrNumber);
            _this.modelSave.splice(delIndex, 1);
            _this.gridOptions.dataSource.data(_this.modelSave);
        }

        this.addInventory = () => {
            if (!$scope.projectForm.$valid) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {
                let TYPE = $scope.listType.find((e) => {
                    return e.ID == $scope.model.TYPE_ID
                })
                $scope.model.arrNumber = _this.gridOptions.dataSource._data.length
                $scope.model.TYPE_NAME = TYPE.DATA_TOPICS
                $scope.model.PurchaseDate_NAME = commonService.formatDate($scope.model.PurchaseDate)
                $scope.model.PurchaseDate = commonService.formatDatDB($scope.model.PurchaseDate)
                if ($scope.model.DisposedDate) {
                    $scope.model.DisposedDate_NAME = commonService.formatDate($scope.model.DisposedDate)
                    $scope.model.DisposedDate = commonService.formatDatDB($scope.model.DisposedDate)
                } else {
                    $scope.model.DisposedDate = null
                }
                // console.log("model", $scope.model);
                _this.modelSave.push($scope.model)
                _this.gridOptions.dataSource.data(_this.modelSave);

                $scope.model = {
                    PurchaseDate: new Date(),
                    STATUS: "ใช้งาน"
                }
            }
        }
        this.cancelForm = () => {
            $location.path("inventory");
        }

        this.saveForm = () => {
            console.log("modelSave", _this.modelSave);
            if (_this.modelSave.length <= 0) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {

                $http.post(webURL.webApi + "inventory/addInventoryService.php", _this.modelSave).then((res) => {
                    // console.log("res.data", res.data);
                    showAlertBox(msgSettings.msgSaveSucc, null);
                }).catch((err) => {
                    showAlertBox(msgSettings.msgNotSave, null);
                }).finally(() => {
                    $location.path("inventory");
                });

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
                $scope.listType = res.data
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }


    }

]);