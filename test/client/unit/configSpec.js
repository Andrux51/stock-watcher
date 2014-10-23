describe('when config',function() {
    var ctrl, $scope, $httpBackend, $routeParams;
    beforeEach(module('meanjsApp'));
    beforeEach(inject(function ($controller, $injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $httpBackend = $injector.get('$httpBackend');
        $routeParams = $injector.get('$routeParams');
        ctrl = $controller('appCtrl', { $scope: $scope });
    }));
    
    describe('a test suite',function() {
        describe('something happens',function() {
            it('should know true is true',function() {
                expect(true).toBe(true);
            });
            it('should know false is false',function() {
                expect(false).toBe(false);
            });
        });
    });    
});

