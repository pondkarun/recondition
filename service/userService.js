'use strict'

app.service('userService', function () {
    var USERNAME;
    var EMPLOYEE_CODE;
    var STATUS;
    var NAME_TH;
    var STATUS_ID;
    var loggedin = false;
    var ID;



    this.saveData = function (data) {
        // console.log(data);

        USERNAME = data.USERNAME;
        NAME_TH = data.NAME_TH;
        EMPLOYEE_CODE = data.EMPLOYEE_CODE;
        STATUS = data.STATUS;
        STATUS_ID = data.STATUS_ID;
        ID = data.ID;
        loggedin = true;
        localStorage.setItem('login', JSON.stringify({
            USERNAME: USERNAME,
            EMPLOYEE_CODE: EMPLOYEE_CODE,
            STATUS_ID: STATUS_ID,
            NAME_TH: NAME_TH,
            STATUS: STATUS,
            ID: ID,
            loggedin: loggedin
        }));
    };

    this.isUserLoggedIn = function () {
        if (localStorage.getItem('login')) {
            loggedin = true;
            var data = JSON.parse(localStorage.getItem('login'));
            USERNAME = data.USERNAME;
            ID = data.ID;
        } else {
            loggedin = false;
        }
        return loggedin;
    };

    this.getPositionName = function () {
        let STATUS_MENU = null;
        if (localStorage.getItem('login')) {
            let position = JSON.parse(localStorage.getItem('login'));
            STATUS_MENU = position.position
        }
        return STATUS_MENU;
    };

    this.getnameTH = function () {
        var data = JSON.parse(localStorage.getItem('login'));
        // console.log("data" , data);
        let log = (data) ? data.NAME_TH : null
        return log;
    };


    this.getName = function () {
        return USERNAME;
    };

    this.setID = function (userID) {
        ID = userID;
    };
    this.getID = function () {
        return ID;
    };
    this.getLoggedin = function () {
        return loggedin;
    };
    this.getStatusID = function () {
        let STATUS_MENU = null;
        if (localStorage.getItem('login')) {
            let STATUS = JSON.parse(localStorage.getItem('login'));
            STATUS_MENU = STATUS.STATUS_ID
        }
        return STATUS_MENU;
    };

})