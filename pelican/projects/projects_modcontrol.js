var a = angular.module("projectsApp", [], function($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        }
    );

function PController($scope) {
    $scope.initialize = function() {
        $scope.dummy = "allo allo, vjerld!";
    }
}

// the first few arguments of the list should correspond to the Angular-namespace stuff to feed to HelloController
var c = a.controller("projectsController", ["$scope", PController]);


