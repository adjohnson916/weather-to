define(['angular'], function (angular) {

  var geocoderModule = angular.module('geocoder', []);

  geocoderModule.provider('geocoder', [function () {

    var config = this.config = {
      google: {
        serverApiKey: null
      }
    };

    var url = 'https://maps.googleapis.com/maps/api/geocode/json';

    this.$get = [
      '$http', '$q',
      function ($http, $q) {

        var geocoder = {};

        geocoder.get = function (address) {
          var deferred = $q.defer();

          console.log('geocoding address', address);

          var key = config.google.serverApiKey;

          $http.
            get(url, {
              params: {
                key: key,
                address: address
              }
            }).
            success(function (data, status, headers, config) {
              deferred.resolve({
                data: data,
                status: status,
                headers: headers,
                config: config
              });
            }).
            error(function (err) {
              deferred.reject(err);
            });

          return deferred.promise;
        };

        return geocoder;
      }];

  }]);

  return geocoderModule;
});
