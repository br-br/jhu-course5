(function () {
  'use-strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  function FoundItems() {
    var ddo = {
      templateUrl: 'foundList.html',
      scope: {
        found: '<',
        onRemove: '&'
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

    narrowSearch.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    var found = [];

    var haveItem = true;

    service.getMenuItems = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
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
        haveItem = false;
      } else {
        haveItem = true;
      }
      console.log("Found items: ", found);
    }

    service.removeItem = function (itemIndex) {
      found.splice(itemIndex, 1);
    };

    service.getFoundItems = function () {
      console.log("Get found items: ", found);
      return found;
    }

    service.checkFoundItems = function () {
      return haveItem;
    }
  }
})();
