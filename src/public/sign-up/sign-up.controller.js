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
  $ctrl.menuOK = false;
  $ctrl.saveMessage = false;

  $ctrl.validateUserMenu = function() {
    var promise = SignUpService.signUp($ctrl.menuNumber);

    promise.then(function (response) {
      $ctrl.menu = response.data;
      $ctrl.menuOK = true;
      $ctrl.menuMessage = false;
      // Check if user entered menu number isn't valid
      // if ($ctrl.menu.menu_items.length == 0) {
        // $ctrl.menuMessage = true;
      // } else {
      //   $ctrl.menuOK = true;
      //   $ctrl.menuMessage = false;
      // }
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
      $ctrl.menuMessage = true;
    });
  };

  $ctrl.signUp = function() {
    $ctrl.saveMessage = false;
    if ($ctrl.menuOK == true) {
      // create object of user's info
      var userInfo = {
        firstname: $ctrl.firstname,
        lastname: $ctrl.lastname,
        email: $ctrl.email,
        phone: $ctrl.phone,
        menuNumber: $ctrl.menuNumber
      };

      // Save user's info to app service
      if( SignUpService.saveUserInfo(userInfo) ) {
        $ctrl.signedUp = true;
        $ctrl.saveMessage = true;
      }
    }
  }
}
})();
