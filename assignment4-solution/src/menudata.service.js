// (function () {
//   'use strict';
//
//   angular.module('Data')
//   .service('MenuDataService', MenuDataService)
//   .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');
//
//   MenuDataService.$inject = ['$http', 'ApiBasePath'];
//   function MenuDataService($http) {
//     var service = this;
//
//     service.getAllCategories = function () {
//       return $http({
//         method: "GET",
//         url: (ApiBasePath + '/categories.json')
//       }).then(function (response) {
//         // console.log(response.data);
//         return response.data;
//       });
//     }
//
//     service.getItemsForCategory = function (categoryShortName) {
//       return $http({
//         method: "GET",
//         url: (ApiBasePath + '/menu_items.json?category=' + categoryShortName)
//       }).then(function (response) {
//         // console.log("Item for category ", categoryShortName);
//         // console.log(response.data.menu_items);
//         return response.data.menu_items;
//       })
//     }
//   }
// })();


(function () {
 'use strict';

 angular.module('Data')
 .service('MenuDataService', MenuDataService)
 .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

 MenuDataService.$inject = ['$http', 'ApiBasePath'];
 function MenuDataService($http, ApiBasePath) {
   var service = this;

   service.getAllCategories = function () {
     return $http({
       method: "GET",
       url:(ApiBasePath + "/categories.json")

<<<<<<< HEAD
     }).then(function (response) {
       // console.log(response.data);
       return response.data;
     });
   }
=======
    service.getAllCategories = function () {
      return $http({
        method: "GET",
        url:("https://davids-restaurant.herokuapp.com/categories.json")
      }).then(function (response) {
        // console.log(response.data);
        return response.data;
      });
    }
>>>>>>> c03319947c61daf381d98ed7bc99fb674b6c9fcd

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
