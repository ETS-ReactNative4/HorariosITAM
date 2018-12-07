var axios = require('axios');
var users_url = process.env.REACT_APP_USERS_SERVICE_URL;

module.exports = {
    login: function(info){
        var url = users_url + '/login';
        console.log(url)
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