angular.module('ExampleModule')
    .service('ObservableStorageService', ['_',
        function (_) {

            var self = this;
            var storage = {};

            self.store = function(key, value) {
                storage[key] = value;
                notify(key);
            };

            self.retrieve = function(key) {
                if (key in storage) return storage[key];
                else return undefined;
            };

            self.remove = function(key) {
                delete storage[key];
            };

            self.enquire = function() {
                // print out everything in here
                for (var key in storage) {
                    console.log(key + ' : ');
                    console.log(storage[key]);
                }
            };

            var callbacks = [];
            
            self.observe = function(key, callback) {
                callbacks.push({key: key, value: callback});
                callback();
            };
            
            self.unobserve = function(key, callback) {
                _.remove(callbacks, function(o) { return _.isEqual(o, {key:key, value: callback}) });
            };
            
            function notify(key) {
                _.forEach(callbacks, function(callback) {
                    if (callback.key === key) {
                        callback.value();
                    }
                })
            }

        }]);
