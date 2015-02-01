meanjsApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', { controller:'_exampleController', templateUrl: 'modules/core/views/home.html' });
    $routeProvider.when('/login', { controller: '_exampleController', templateUrl: 'modules/core/views/login.html'});
    $routeProvider.otherwise({redirectTo:'/'});
}]);
