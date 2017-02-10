(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsCategoryController', ItemsCategoryController);

  ItemsCategoryController.$inject = ['name', 'items'];
  function ItemsCategoryController(name, items) {
    var itemsCategory = this;
    console.log("name: ", name);
    itemsCategory.name = name;
    console.log("Items category: ", items);
    itemsCategory.items = items;
  }
})();
