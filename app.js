'use strict'

var app = angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngRoute', 'kendo.directives']);
var loading = new loadingTopJS();

var webURL = {
    webApi: "http://127.0.0.1/recondition/api/"
}