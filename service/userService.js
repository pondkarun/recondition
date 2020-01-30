'use strict'

app.service('userService', function () {
    var USERNAME;
    var EMPLOYEE_CODE;
    var loggedin = false;
    var ID;

    this.getName = function () {
        return USERNAME;
    };

    this.setID = function (userID) {
        ID = userID;
    };
    this.getID = function () {
        return ID;
    };

    this.demo = function () {
        let demo = "demossssssssssssssss008";
        return demo;
    };
    this.saveData = function (data) {
        USERNAME = data.USERNAME;
        EMPLOYEE_CODE = data.EMPLOYEE_CODE;
        ID = data.ID;
        loggedin = true;
        localStorage.setItem('login', JSON.stringify({
            USERNAME: USERNAME,
            EMPLOYEE_CODE: EMPLOYEE_CODE,
            ID: ID
        }));
    };

    this.isUserLoggedIn = function () {
        if (!!localStorage.getItem('login')) {
            loggedin = true;
            var data = JSON.parse(localStorage.getItem('login'));
            USERNAME = data.USERNAME;
            ID = data.ID;
        }
        return loggedin;
    };


})