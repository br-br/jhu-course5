(function () {
  'use strict';

  angular.module('Data')
  .service('MenuDataService', MenuDataService)
  .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

  MenuDataService.$inject = ['$http', 'ApiBasePath'];
  function MenuDataService($http, ApiBasePath) {
    var service = this;

    service.getAllCategories = function () {
      return $http({
        method: "GET",
        url: (ApiBasePath + '/categories.json')
      }).then(function (response) {
        // console.log(response.data);
        return response.data;
      });
    }

    service.getItemsForCategory = function (categoryShortName) {
      return $http({
        method: "GET",
        url: (ApiBasePath + '/menu_items.json?category=' + categoryShortName)
      }).then(function (response) {
        // console.log("Item for category ", categoryShortName);
        // console.log(response.data.menu_items);
        return response.data.menu_items;
      })
    }
  }
})();
