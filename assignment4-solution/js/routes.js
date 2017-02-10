(function () {
    'use strict'
    angular.module('MenuApp').config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
        url: '/',
        templateUrl: 'templates/home.template.html'
    })

    .state('categories', {
        url: '/categories',
        templateUrl: 'templates/categories.template.html',
        controller: 'CategoriesController as categoriesController',
        resolve: {
            categories: ['MenuDataService', function (MenuDataService) {                
                return MenuDataService.getAllCategories();
            }]
        }
    })
    
    .state('items', {
        url: '/items/{categoryName}',
        templateUrl: 'templates/items.template.html',
        controller: 'ItemsController as itemsController',
        resolve: {
            items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
                console.log($stateParams.categoryName);          
                return MenuDataService.getItemsForCategory($stateParams.categoryName);
            }]
        }
    })

    // Premade list page
    //   .state('mainList', {
    //     url: '/main-list',
    //     templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
    //     controller: 'MainShoppingListController as mainList',
    //     resolve: {
    //       items: ['ShoppingListService', function (ShoppingListService) {
    //         return ShoppingListService.getItems();
    //       }]
    //     }
    //   })

    //   .state('mainList.itemDetail', {
    //     url: '/item-detail/{itemId}',
    //     templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
    //     controller: "ItemDetailController as itemDetail"
    //   });

    }
})();