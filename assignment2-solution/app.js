(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var availList = this;
    availList.items = ShoppingListCheckOffService.getAvailable();
    availList.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.items = ShoppingListCheckOffService.getBought();
}


function ShoppingListCheckOffService() {
  var service = this;

  var availItems = [
    { name: "Cookies",
      quantity: 10 },
    { name: "Apples",
      quantity: 5 },
    { name: "Noodles",
      quantity: 20 },
    { name: "Cheese",
      quantity: 2 },
    { name: "Bananas",
      quantity: 30 },
    { name: "Nougat",
      quantity: 100 },
    { name: "Almonds",
      quantity: 50 },
    { name: "Oranges",
      quantity: 15 },
    { name: "Cherries",
      quantity: 75 },
    { name: "Candies",
      quantity: 3 }
  ];
  var boughtItems = [];

  service.getAvailable = function () {
    return availItems;
  };
  service.getBought = function () {
    return boughtItems;
  };

  service.buyItem = function (itemIndex) {
    var item = availItems.splice(itemIndex, 1)[0];
    boughtItems.push(item);
  };
}

})();
