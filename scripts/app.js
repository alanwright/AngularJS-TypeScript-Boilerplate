///<reference path="../typedefs/jQuery/jQuery.d.ts"/>
///<reference path="../typedefs/angular/angular.d.ts"/>
///<reference path="../typedefs/angular/angular-route.d.ts"/>
///<reference path="../typedefs/lodash/lodash.d.ts"/> 
'use strict';
var boilerplate;
(function (boilerplate) {
    var moduleName = "boilerplate";
    var appClass = ".app";
    angular.module(moduleName, ['ngRoute'])
        .factory('proxyService', ['$http', function ($http) { return boilerplate.services.createProxyService($http); }])
        .config(['$routeProvider', function (routeProvider) {
            routeProvider.when('/', {
                templateUrl: 'app/views/greeting.html',
                controller: ['proxyService', function (proxyService) {
                        return new boilerplate.controllers.GreetingController(proxyService);
                    }],
                controllerAs: '$ctrl'
            })
                .otherwise({
                templateUrl: 'app/views/error.html'
            });
        }]);
    // Uncomment when a directive is used.
    // export function registerDirective(directiveName: string) {
    //     let loweredName = directiveName[0].toLowerCase() + directiveName.slice(1);
    //     let annotatedFunction = [() => new boilerplate.directives[directiveName]()];
    //     angular.module(moduleName).directive(loweredName, annotatedFunction);
    // }
    function registerComponent(componentName, options) {
        var loweredName = componentName[0].toLowerCase() + componentName.slice(1);
        angular.module(moduleName).component(loweredName, options);
    }
    boilerplate.registerComponent = registerComponent;
    function bootstrap() {
        angular.element(window.document).ready(function () {
            var app = $(appClass);
            app.attr('ng-app', moduleName);
            angular.bootstrap(app, [moduleName]);
        });
    }
    boilerplate.bootstrap = bootstrap;
})(boilerplate || (boilerplate = {}));
$(document).ready(function () {
    boilerplate.bootstrap();
});
var boilerplate;
(function (boilerplate) {
    var components;
    (function (components) {
        var Greeting = (function () {
            function Greeting() {
                this.templateUrl = 'app/views/greeting.html';
                this.controller = ['proxyService', function (proxyService) {
                        return new boilerplate.controllers.GreetingController(proxyService);
                    }];
            }
            return Greeting;
        }());
        components.Greeting = Greeting;
    })(components = boilerplate.components || (boilerplate.components = {}));
})(boilerplate || (boilerplate = {}));
boilerplate.registerComponent('Greeting', new boilerplate.components.Greeting());
var boilerplate;
(function (boilerplate) {
    var controllers;
    (function (controllers) {
        var GreetingController = (function () {
            function GreetingController(proxyService) {
                this.proxyService = proxyService;
                this.setup();
            }
            GreetingController.prototype.setup = function () {
                var _this = this;
                this.proxyService.getGreeting('1').then(function (response) {
                    _this.greeting = response;
                });
            };
            return GreetingController;
        }());
        controllers.GreetingController = GreetingController;
    })(controllers = boilerplate.controllers || (boilerplate.controllers = {}));
})(boilerplate || (boilerplate = {}));
var boilerplate;
(function (boilerplate) {
    var services;
    (function (services) {
        function createProxyService($http) {
            return new ProxyService($http);
        }
        services.createProxyService = createProxyService;
        var ProxyService = (function () {
            function ProxyService($http) {
                this.$http = $http;
            }
            ProxyService.prototype.getGreeting = function (id) {
                var deferred = $.Deferred();
                this.$http.get(/*'/greetings/' + id*/ 'data/db.json')
                    .success(function (greeting) {
                    deferred.resolve(greeting);
                })
                    .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise();
            };
            ProxyService.prototype.postGreeting = function (greeting) {
                var deferred = $.Deferred();
                var stringifyGreeting = JSON.stringify(greeting);
                this.$http.post('/greetings', stringifyGreeting)
                    .success(function (response) {
                    deferred.resolve(response.data);
                })
                    .error(function (reason) {
                    deferred.resolve(reason);
                });
                return deferred.promise();
            };
            return ProxyService;
        }());
    })(services = boilerplate.services || (boilerplate.services = {}));
})(boilerplate || (boilerplate = {}));
