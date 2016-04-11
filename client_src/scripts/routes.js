(function() {
    angular.module('meanjsApp').config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', { controller:'WatcherController', controllerAs: 'vm', templateUrl: 'modules/core/views/home.html' });
        $routeProvider.otherwise({redirectTo:'/'});
    }]);
})();
