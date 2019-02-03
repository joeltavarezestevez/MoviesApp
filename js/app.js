var app = angular.module('moviesApp', ['ui.router', 'webcam'])

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider
    .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html',
        controller: 'appCtrl'
    })

	.state('peliculas', {
        url: '/peliculas',
        templateUrl: 'templates/peliculas.html',
        controller: 'peliculasCtrl'
    })

	.state('peliculas-detalles', {
        url: '/peliculas/:id',
        templateUrl: 'templates/peliculasDetalles.html',
        controller: 'peliculasDetallesCtrl'
    })

	.state('series', {
        url: '/series',
        templateUrl: 'templates/series.html',
        controller: 'seriesCtrl'
    })

	.state('series-detalles', {
        url: '/series/:id',
        templateUrl: 'templates/seriesDetalles.html',
        controller: 'seriesDetallesCtrl'
    })         
}])

app.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        //template: '<div class="loading"><i class="fa fa-spinner" aria-hidden="true"></i>LOADING...</div>'
        template: '<div id="loading"><img src="./img/logo.png" width="250em" class="centered"/><small></small></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  })