(function () {
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService)
  ..constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");;

  // returns a promise which is a result of using the $http service
  MenuDataService.$inject = ['$http', 'ApiBasePath'];
  function MenuDataService($http, ApiBasePath) {
    var service = this;

    service.getAllCategories = function() {
        return $http({
            method: "GET",
            url: (ApiBasePath + '/categories.json')
        }).then(function(response) {;
            return response.data;
        });
    };

    // returns a promise which is a result of using the $http service
    service.getItemsForCategory = function(categoryShortName) {
        return $http({
            method: "GET",
            url: (ApiBasePath + '/menu_items.json?category=' + categoryShortName)
        }).then(function(response) {
            return response.data.menu_items;
        });
    };
  }
})();
