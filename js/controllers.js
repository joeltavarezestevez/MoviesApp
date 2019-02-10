app.controller('appCtrl', ["$scope", "WebcamService", function($scope, WebcamService) {
	/*$scope.showweb = true;
	$scope.camera = WebcamService.webcam;
	$scope.photo = '';
	$scope.contentType = '';

	$scope.camera.success = function(image, type) {
		$scope.photo = image;
		$scope.contentType = type;
		$scope.showweb = false;
	}

	$scope.turnOffCamera = function() {
		if($scope.camera && $scope.camera.isTurnOn == true) {
			$scope.camera.turnOff();	
		}
	}*/
}])

app.controller('peliculasCtrl', ["$scope", "$http", "$filter", function($scope, $http, $filter, MyCache) {
	console.time('peliculasLoader');
	$scope.movies = [];
	$scope.filtered = [];
	$scope.currentPage = 0;
    $scope.pageSize = 18;
    $scope.buscar = '';
	$scope.init = function() {
		$scope.loading = true;
		$http.get('https://varnatrd.tech/api/movies/', { cache: MyCache })
		.then(function success(movies){
			$scope.movies = movies.data;
			console.log($scope.movies);
			$scope.loading = false;
			console.timeEnd('peliculasLoader');
		}
		, function error(error){
			console.log(error)
			$scope.loading = false;
		})
	}

    $scope.getData = function () {
    	$scope.filtered = $filter('filter')($scope.movies, $scope.buscar);
    	return $scope.filtered;
    }
    
    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);
    }

    $scope.$watch('buscar', function(newValue,oldValue){
    	if(oldValue!=newValue){
    		$scope.currentPage = 0;
    	}
    },true);
}]);

app.controller('peliculasDetallesCtrl', ["$scope", "$http", '$stateParams', function($scope, $http, $stateParams) {

	$scope.movie = {};

	$scope.init = function() {
		$scope.loading = true;
		$http.get('https://varnatrd.tech/api/movies/' + $stateParams.id)
		.then(function success(movie){
			$scope.movie = movie.data;
			console.log($scope.movie);
			$scope.loading = false;
		}
		, function error(error){
			console.log(error)
			$scope.loading = false;
		})
	}
}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
})

app.controller('seriesCtrl', ["$scope", "$http", "$filter", function($scope, $http, $filter, MyCache) {

	$scope.series = [];
	$scope.currentPage = 0;
    $scope.pageSize = 18;
    $scope.filtered = [];
    $scope.buscar = '';
	$scope.init = function() {
		$scope.loading = true;
		$http.get('https://varnatrd.tech/api/series', { cache: MyCache })
		.then(function success(series){
			$scope.series = series.data;
			$scope.filtered = $scope.series;
			console.log($scope.series);
			$scope.loading = false;
		}
		, function error(error){
			console.log(error);
			$scope.loading = false;
		})
	}
    
    $scope.getData = function () {
      $scope.filtered = $filter('filter')($scope.series, $scope.buscar);
      return $scope.filtered;
    }
    
    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);
    }

    $scope.$watch('buscar', function(newValue,oldValue){
    	if(oldValue!=newValue){
    		$scope.currentPage = 0;
    	}
    },true);	
}])

app.controller('seriesDetallesCtrl', ["$scope", "$http", '$stateParams', '$filter', 'orderByFilter', function($scope, $http, $stateParams, $filter, orderBy) {

	$scope.episodios = [];
	$scope.currentPage = 0;
    $scope.pageSize = 18;
    $scope.filtered = [];
    $scope.buscar = '';	

	$scope.init = function() {
		$scope.loading = true;
		$http.get('https://varnatrd.tech/api/series/all_episode_favorite/' + $stateParams.id)
		.then(function success(serie){
			$scope.serie = serie.data;
			serie.data.episodes.forEach(episodio => {
				episodio.season = parseInt(episodio.season);
				$scope.episodios.push(episodio);
			});
			//$scope.episodios = serie.data.episodes;
			$scope.episodios = orderBy($scope.episodios, 'season');
			console.log($scope.episodios);
			$scope.filtered = $scope.episodios;
			$scope.loading = false;
		}
		, function error(error){
			console.log(error)
			$scope.loading = false;
		})
	}

    $scope.getData = function () {
      $scope.filtered = $filter('filter')($scope.episodios, $scope.buscar);
      return $scope.filtered;
    }
    
    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);
    }

    $scope.$watch('buscar', function(newValue,oldValue){
    	if(oldValue!=newValue){
    		$scope.currentPage = 0;
    	}
    },true);	
}]);