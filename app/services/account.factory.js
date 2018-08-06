(function() {
	'use strict';

	app.factory('account.repository', function(webApi, $http) {
		return {
			login: _login,
			registration: _registration,
			getUserData: _getUserData,
			editUserData: _editUserData
		};

		function _registration(data) {
			return $http.post(webApi.DOMAIN + '/api/v1/account/register', data);
		}

		function _login(data) {
			return $http.post(webApi.DOMAIN + '/api/v1/account/login', data);
		}

		function _getUserData(id) {
			return $http.get(webApi.DOMAIN + '/api/v1/users/' + id);
		}
		function _editUserData(id, data) {
			return $http.put(webApi.DOMAIN + '/api/v1/users/' + id, data);
		}
	})
})()