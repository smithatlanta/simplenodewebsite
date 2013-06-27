function getUsers(scope, http, location){
	http.defaults.headers.get = {'Authorization' : localStorage.username + ":" + localStorage.password + ":" + localStorage.session };
	http.get('/users').
		success(function(data, status, headers, config) {
			scope.users = data;
		}).
		error(function(data, status, headers, config) {
			location.url('/');
	});
}