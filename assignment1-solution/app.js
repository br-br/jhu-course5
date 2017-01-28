(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.message = "";
    $scope.items = [];
    $scope.colored = {};

    $scope.checkTooMuch = function () {
      $scope.message = getMessage($scope.items);
    };
    $scope.turnRed = function() {
        $scope.colored = {"color":"red"};
    }
    $scope.turnGreen = function() {
        $scope.colored = {"color":"green"};
    }

    function getMessage (itemsList) {
      var message = "";
      itemsList = itemsList.filter(Boolean);
      if (itemsList.length == 0) {
        message = "Please enter data first";
        $scope.turnRed();
      } else if (itemsList.length <= 3) {
        message = "Enjoy!";
        $scope.turnGreen();
      } else {
        message = "Too much!";
        $scope.turnGreen();
      }
      return message;
    }
  }



})();
