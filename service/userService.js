'use strict'

app.service('userService', function() {

    this.demo = function() {
        let demo = "demossssssssssssssss008";
        return demo;
    };

    this.saveData = function(data) {
        username = data.user;
        id = data.id;
        loggedin = true;
        localStorage.setItem('login', JSON.stringify({
            username: username,
            id: id
        }));
    };

})