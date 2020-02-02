'use strict'

app.controller("inventoryController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings) {
        let _this = this;
        $scope.modelSave = {};
        _this.ID = userService.getID();

        this.init = function() {

        }

        this.gridOptions = {
            gridID: 'gridSearchInventory',
            dataSource: new kendo.data.DataSource({ data: [], pageSize: 10 }),
            sortable: true,
            pageable: true,
            columns: [{
                    field: "INVENTORY_CODE",
                    title: "ID"
                },

                {
                    field: "TYPE",
                    title: "Type"
                },

                {
                    field: "BRAND",
                    title: "Brand"
                },

                {
                    field: "MODEL",
                    title: "Model"
                },

                {
                    field: "SERIAL",
                    title: "Serial"
                },

                {
                    field: "CREATE_DATE",
                    title: "Create Date"
                },

                {
                    field: "STATUS",
                    title: "Status"
                }
            ],
            management: true,
            operation: {
                view: false,
                del: false,
                edit: true
            },
            showIndex: false,
        };

        this.addInventory = () => {
            //alert("เพิ่ม");
            $location.path("inventory" + "/add/" + 0);
        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }


    }

]);