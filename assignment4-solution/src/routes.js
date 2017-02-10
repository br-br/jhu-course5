(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no ther URL matches
    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider

    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/templates/home.template.html'
    })

    // Categories page
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/templates/main-categories.template.html',
      controller: 'CategoriesController as categoriesCtrl',
      resolve: {
        items: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    // Category items page
    .state('items', {
      url: '/category/{categoryShortName}/{categoryId}',
      templateUrl: 'src/templates/main-items.template.html',
      controller: 'ItemsCategoryController as itemsCategory',
      resolve: {
        name: ['$stateParams', 'MenuDataService',
        function ($stateParams, MenuDataService) {
          return MenuDataService.getAllCategories().then(
            function (response) {
              return response[$stateParams.categoryId].name;
          });
        }],
        items: ['$stateParams', 'MenuDataService',
          function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
      }
    });
  }
})();
