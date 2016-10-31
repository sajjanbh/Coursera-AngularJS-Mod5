(function () {
  "use strict";

  angular.module("public")
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['SignUpService'];

  function MyInfoController(SignUpService) {
    var $ctrl = this;

    $ctrl.signedUp = SignUpService.getSignUpStatus();

    // Check if user is signed up
    if ($ctrl.signedUp) {
      $ctrl.myinfo = SignUpService.getMyInfo();

      var promise = SignUpService.signUp($ctrl.myinfo.menuNumber);

      promise.then(function (response) {
        $ctrl.item = response.data;
      });
    }
  }
})();
