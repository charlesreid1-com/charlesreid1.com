var ng;
dir = [];

// hipster jesus api
// for some hipster ipsum
var hipster_ipsum = function(N,tagname) {
    $.getJSON('http://hipsterjesus.com/api?paras='+N+'&html=true', function(data) {
        $(tagname).html( data.text );
    });
};

ng = a.directive('projectt', function() {

    function link(scope, element, attr) {

        var something = "something";

        var el = element[0];
        var div = $("<div />").text(something);
        angular.element(el).append(div);

    }
    return {
        restrict: "E",
        link: link,
        scope: {}
    }
});
dir.push(ng);

