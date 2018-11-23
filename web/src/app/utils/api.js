var axios = require('axios');
var users_url = '/student';

module.exports = {
    login: function(info){
        var url = users_url + '/login';
        var encodedURI = window.encodeURI(url);

        return axios.post(encodedURI, {
            cu: info.cu,
            pw: info.pw
        })
        .then(function(response){
            return response.data;
        })
        .catch(function(error){
            console.log(error);
        })
    }
}