var baseUrl = require('../common/urls')
var myService = {
    register: function (userdata, $http) {
        //return the promise directly.
        console.log(userdata);
        //        return $http.post(baseUrl.apiBase + 'register', userdata);
        return $http({
            method: 'POST'
            , url: baseUrl.apiBase + 'register'
            , headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            , transformRequest: function (obj) {
                var str = [];
                for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
            , data: {
                username: userdata.username
                , password: userdata.password
            }
        });
    }
    , login: function (userdata, $http) {
        //return the promise directly.
        //        return $http.post(baseUrl.apiBase + 'authenticate ', userdata);
        return $http({
            method: 'POST'
            , url: baseUrl.apiBase + 'authenticate'
            , headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            , transformRequest: function (obj) {
                var str = [];
                for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
            , data: {
                username: userdata.username
                , password: userdata.password
            }
        });
    }
};
module.exports = myService