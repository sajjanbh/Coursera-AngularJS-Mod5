(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['SignUpService'];
function SignUpController(SignUpService) {
  var $ctrl = this;
  $ctrl.firstname = "";
  $ctrl.lastname = "";
  $ctrl.email = "";
  $ctrl.phone = "";
  $ctrl.menuNumber = "";

  $ctrl.signedUp = false;
  $ctrl.menuMessage = false;
  $ctrl.saveMessage = false;

  $ctrl.signUp = function() {
    var promise = SignUpService.signUp($ctrl.menuNumber);

    promise.then(function (response) {
      $ctrl.menu = response.data;

      // Check if user entered menu number isn't valid
      if ($ctrl.menu.menu_items.length == 0) {
        $ctrl.menuMessage = true;
        $ctrl.saveMessage = false;
      } else {
        $ctrl.menuMessage = false;
        //console.log($ctrl.menu);
        var userInfo = {
          firstname: $ctrl.firstname,
          lastname: $ctrl.lastname,
          email: $ctrl.email,
          phone: $ctrl.phone,
          menuNumber: $ctrl.menuNumber
        };

        if( SignUpService.saveUserInfo(userInfo) ) {
          $ctrl.signedUp = true;
          $ctrl.saveMessage = true;
        }
      }
    })
    .catch(function (error) {
      $ctrl.message = "Something went terribly wrong.";
    });
  }
}
})();
