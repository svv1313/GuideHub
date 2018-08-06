(function() {
	'use strict';

	app.controller('Login', [
		'$scope',
		'account.repository',
		'$location',
		'$uibModalInstance',
		function($scope, accountRepository, $location, $uibModalInstance) {
			$scope.user = {
				"login": "",
				"password": ""
			};

			$scope.submitLogin = function() { 
				accountRepository.login($scope.user).then(function(response) {
					console.log(response.data.id);
					$location.path($location.url() + response.data.id);
					localStorage.setItem('authToken', response.data.authToken);
					localStorage.setItem('userId', response.data.id);
					$uibModalInstance.close(true);
				}, function(error) {});
			}
		}]);
})();