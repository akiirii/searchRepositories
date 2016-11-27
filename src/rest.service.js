angular
  .module('restService', [])
  .factory('restService', ['$http', function ($http) {
    return {
      getRepositories: function (user) {
        console.log(user)
        return $http.get('https://api.github.com/users/' + user + '/repos')
      }
    }
  }])
