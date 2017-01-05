 var myService = {
 	register: function (userdata, $http) {
 		//return the promise directly.
 		return $http.post('http://localhost:8080/api/register', userdata);
 	}
 };
 module.exports = myService