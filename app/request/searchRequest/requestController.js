'use strict'

app.controller("requestController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSearch = {
            INVENTORY_CODE: null,
            BRAND: null,
            TYPE_ID: null,
            MODEL: null,
            SERIAL: null,
            STATUS: "all"
        };
        _this.ID = userService.getID();

        this.init = function() {
            _this.searchrRequest()
        }

        this.gridOptions = {
            gridID: 'gridSearchRequest',
            dataSource: new kendo.data.DataSource({ data: [], pageSize: 10 }),
            sortable: true,
            pageable: true,
            columns: [{
                    field: "SERVICES_CODE",
                    title: "ID",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "NAME_TH",
                    title: "ผู้แจ้ง",
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

                {
                    field: "EMAIL",
                    title: "E-Mail",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "LOCATION",
                    title: "Location",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "START_DATE",
                    title: "Create Date",
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
                view: true,
                del: false,
                edit: false
            },
            showIndex: false,
        };
        this.gridCallbackEdit = (item) => {
            // console.log("item", item);
            $location.path("inventory" + "/edit/" + item.ID);
        }
        this.addInventory = () => {
            $location.path("inventory" + "/add/" + 0);
        }



        this.searchrRequest = () => {
            // console.log("modelSearch", _this.modelSearch);
            loading.open();
            $http.post(webURL.webApi + "inventory/searchInventoryService.php", _this.modelSearch).then((res) => {
                // console.log("res.data", res.data);

                res.data.filter((e) => {
                    e.PurchaseDate = commonService.formatDate(e.PurchaseDate)
                    e.STATUS = (e.STATUS == 'ใช้งาน') ? "Active" : "Terminate";
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

        this.clearInventory = () => {
            _this.modelSearch = {
                INVENTORY_CODE: null,
                BRAND: null,
                TYPE_ID: null,
                MODEL: null,
                SERIAL: null,
                STATUS: "all"
            };
            _this.searchInventory();
        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }


    }

]);