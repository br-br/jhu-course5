(function () {
  'use strict';

  angular.module('MenuApp')
  .component('itemsDetail', {
    templateUrl: 'src/templates/items.template.html',
    bindings: {
      items: '<'
    }
  });
})();
