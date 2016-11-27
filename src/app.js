var searchRepositories = angular.module('searchRepositories', ['ngMaterial', 'restService']);

searchRepositories.controller('mainController', ['$scope', 'restService', function ($scope, restService) {

  $scope.searchRepo = function () {
    $scope.error = '';
    $scope.loading = true;
    $scope.repositories = [];
    restService.getRepositories(this.search).then(function (success) {
      $scope.repositories = success.data;
      $scope.loading = false;
    }, function (error) {
      $scope.loading = false;
      $scope.error = error.status == 404 ? 'user' : 'server';
    })
  }
}])
