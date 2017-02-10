(function () {
    'use strict'

    angular.module('DataModule').service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http'];
    function MenuDataService($http) {
        var menuDataService = this;
        
        menuDataService.getAllCategories = function() {
            return $http.get('https://davids-restaurant.herokuapp.com/categories.json')
                        .then(function (result) {
                            console.log('here');
                            return result.data;
                    });
        }

        menuDataService.getItemsForCategory = function(category) {
            return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json?category=' + category)
                        .then(function (result) {
                            return result.data.menu_items;
                    });
        }
    };
})();