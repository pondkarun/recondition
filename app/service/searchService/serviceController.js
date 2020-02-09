'use strict'

app.controller("serviceController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
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
        this.ID = userService.getID();
        this.statusUserID = userService.getStatusID()


        this.init = function() {
            _this.statusUser = $routeParams;
            $scope.statusIf = (_this.statusUserID == "676D96D5C4C54A83BB2C9B657FD02C66") ? true : false;
            _this.searchrService()
        }

        this.gridOptions = {
            gridID: 'gridSearchService',
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
                    field: "CreateDate",
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
        this.gridCallbackView = (item) => {
            // console.log("item", item);
            $location.path("service" + "/view/" + item.ID);
        }

        this.addService = () => {
            $location.path("service" + "/add/" + 0);
        }

        this.searchrService = () => {
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

        this.clearService = () => {
            _this.modelSearch = {
                INVENTORY_CODE: null,
                BRAND: null,
                TYPE_ID: null,
                MODEL: null,
                SERIAL: null,
                STATUS: "all"
            };
            _this.searchService();
        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }


    }

]);