(function () {
    'use strict'
    function CategoriesComponent(){
        return {
            templateUrl: 'shoppingList.html',
            bindings: {
                items: '<',
                onRemove: '&'
            }
        }
    }
})();