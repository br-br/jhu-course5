(function() {
    'use strict';
    angular.module('public')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['MenuService'];
    function SignupController(MenuService) {
        var $ctrl = this;

        $ctrl.user = {};
        $ctrl.favoriteDish = {};

        $ctrl.showError = false;       // true will show the favorite-dish-error
        $ctrl.showMessage = false;     // true will show success-on-signup-message

        $ctrl.signup = function(form) {
            $ctrl.showError = false;
            $ctrl.showMessage = false;
            // If the form is not valid don't submit
            if(form.$invalid) {
                console.log('form is not valid');
                return;
            }

            MenuService.getFavoriteDish($ctrl.user.favoriteDish).then(function(response) {
                $ctrl.user.favoriteDishDetails = response.data;
                console.log($ctrl.favoriteDish);
                MenuService.saveUser($ctrl.user);
                $ctrl.showMessage = true;
            }, function(error) {
                console.log(error);
                $ctrl.showError = true;
            });

        }
    };

})();
