meanjsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', { controller:'appCtrl', template: '{{foo}}' });
  }
]);
