describe('Search Repositories Test', function () {

  var $rootScope, $scope, restService, controller, $q;

  var resolve = function (response) {
    var deferred = $q.defer();
    deferred.resolve(response)
    return deferred.promise;
  }

  var reject = function (response) {
    var deferred = $q.defer();
    deferred.reject(response);
    return deferred.promise;
  }

  beforeEach(module('searchRepositories'));

  beforeEach(inject(function (_$rootScope_, _restService_, _$controller_, _$q_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    restService = _restService_;
    $controller = _$controller_;
    $q = _$q_;

    controller = $controller('mainController', {
      $scope: $scope,
      restService: restService
    });
  }));

  it('Should stop loading when server respond', function () {
    restService.getRepositories = function () {
      return resolve({
        data: []
      });
    };
    $scope.searchRepo();
    $rootScope.$digest()
    expect($scope.loading).toBe(false);
  });

  it('Should display list of repositories when server return list', function () {
    restService.getRepositories = function () {
      return resolve({
        data: [{
          name: 'test'
        }, {
          name: 'test2'
        }]
      });
    };
    $scope.searchRepo();
    $rootScope.$digest()

    var result = [{
      name: 'test'
    }, {
      name: 'test2'
    }];
    expect($scope.repositories).toEqual(result);
  });

  it('Should massage when user do not have repositories', function () {
    restService.getRepositories = function () {
      return resolve({
        data: []
      });
    };
    $scope.searchRepo();
    $rootScope.$digest()
    expect($scope.repositories.length).toBe(0);
  });
  //
  it('Should error when user do not exists', function () {
    restService.getRepositories = function () {
      return reject({
        status: 404
      });
    };
    $scope.searchRepo();
    $rootScope.$digest()
    expect($scope.error).toBe('user');
  });

  it('Should error when server do not respond', function () {
    restService.getRepositories = function () {
      return reject({
        status: 500
      });
    };
    $scope.searchRepo();
    $rootScope.$digest()
    expect($scope.error).toBe('server');
  });
});
