define(['angular'], function (angular) {

  var forecastIoModule = angular.module('forecastIo', []);

  forecastIoModule.provider('forecastIo', [function () {

    var config = this.config = {
      google: {
        serverApiKey: null
      }
    };

    this.$get = [
      '$http', '$q',
      function ($http, $q) {

        var forecastIo = {};

        forecastIo.get = function (location) {

          var deferred = $q.defer();

          var cache = true;

          var lat;
          var lng;
          if (location) {
            if (location.coords) {
              lat = location.coords.lat;
              lng = location.coords.lng;
            }
          }
          
          lat = lat || 37.8267;
          lng = lng || -122.423;

          var url;
          // url = '/data/forecast-io_37.8267_-122.423.json';
          url = 'https://api.forecast.io/forecast/' + config.apiKey + '/' + lat + ',' + lng;

          $http.
            jsonp(url, {
              cache: cache,
              params: {
                callback: 'JSON_CALLBACK'
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

        return forecastIo;
      }];

  }]);

  return forecastIoModule;
});
