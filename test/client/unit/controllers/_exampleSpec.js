describe('when _exampleController is loaded',function() {
    var ctrl, $scope, $httpBackend, $routeParams;
    // load angular.module and the desired controller and its dependencies
    beforeEach(module('meanjsApp'));
    beforeEach(inject(function ($controller, $injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $httpBackend = $injector.get('$httpBackend');
        $routeParams = $injector.get('$routeParams');
        ctrl = $controller('_exampleController', { $scope: $scope });
    }));
    // load mocks and other variables
    var hello;
    beforeEach(function() {
        hello = window.jsonMocks['_example'];
    });

    // start actual test assertions... my pattern is to use one describe block for each function or chunk of functionality
    describe('make sure karma suite is working correctly',function() {
        it('should know true is true',function() {
            expect(true).toBe(true);
        });
        it('should load jsonMocks', function() {
            expect(hello.everything).toBe(42);
        });
    });

    describe('initialize example controller', function() {
        it('should call a function to initialize some scope variables', function() {
            spyOn($scope,'init');
            $scope.init();
            expect($scope.init).toHaveBeenCalled();
        });
        it('should set some bogus variable to show how angular binding works', function() {
            $scope.init();
            expect($scope.foo).toBe('bar');
        });
    });
});

