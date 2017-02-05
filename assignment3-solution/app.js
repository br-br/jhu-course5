(function () {
  'use-strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)
  .constant('URL', "https://davids-restaurant.herokuapp.com/menu_items.json");

  function FoundItems() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&',
        error: '<'
      },
      controller: NarrowItDownController,
      controllerAs: 'narrowSearch',
      bindToController: true
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowSearch = this;

    narrowSearch.searchTerm = "";
    narrowSearch.found = MenuSearchService.getFoundItems();
    //narrowSearch.found = [];
    narrowSearch.error = false;

    narrowSearch.checkFoundItems = function () {
      return MenuSearchService.checkFoundItems();
    };

    narrowSearch.searchMenuItems = function () {
      var promise = MenuSearchService.getMenuItems();

      promise.then(function (response) {
        var menuItems = response.data.menu_items;
        console.log("Menu items: ", menuItems);
        console.log("Search Term: ", narrowSearch.searchTerm);
        MenuSearchService.getMatchedMenuItems(menuItems, narrowSearch.searchTerm);
      })
    };
    // menu.narrowItDown = function() {
    //     menu.found = []
    //     if (menu.searchTerm) {
    //         var resultPromise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    //         resultPromise.then(function(items) {
    //             menu.found = items;
    //         });
    //     } else {
    //         menu.showError();
    //
    //     }
    //
    // };

    narrowSearch.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    }
  }

  MenuSearchService.$inject = ['$http', 'URL'];
  function MenuSearchService($http, URL) {
    var service = this;

    var found = [];

    var isFound = true;

    service.getMenuItems = function () {
      var response = $http({
        method: "GET",
        url: (URL)
      });

      return response;
    }

    service.getMatchedMenuItems = function (menuItems, searchTerm) {
      if (found.length > 0) {
        found.splice(0, found.length);
      }
      if (searchTerm != "") {
        for (var i = 0; i < menuItems.length; i++) {
          var item = menuItems[i];
          var description = item.description;
          if (description.indexOf(searchTerm) !== -1) {
            found.push(item);
          }
        }
      }
      if (found.length == 0) {
        isFound = false;
      } else {
        isFound = true;
      }
      console.log("Found items: ", found);
      //return found;
    }

    service.removeItem = function (itemIndex) {
      found.splice(itemIndex, 1);
    };

    service.getFoundItems = function () {
      console.log("Get found items: ", found);
      return found;
    }

    service.checkFoundItems = function () {
      return isFound;
    }
  }
})();
