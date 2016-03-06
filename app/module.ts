'use strict';

module boilerplate {
    import IProxyService = boilerplate.services.IProxyService;
    
    const moduleName = "boilerplate";
    const appClass = ".app";
    
    angular.module(moduleName, ['ngRoute'])
        
        //Proxy Factory
        .factory('proxyService', ['$http', ($http: ng.IHttpService) => services.createProxyService($http)])
        
        // routing
        .config(['$routeProvider', (routeProvider: ng.route.IRouteProvider) => {
            
            routeProvider.when('/', {
                templateUrl: 'app/views/greeting.html',
                controller: ['proxyService', (proxyService: IProxyService) =>
                    new boilerplate.controllers.GreetingController(proxyService)],
                controllerAs: '$ctrl',
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
    
    export function registerComponent(componentName: string, options: ng.IComponentOptions) {
        let loweredName = componentName[0].toLowerCase() + componentName.slice(1);
        angular.module(moduleName).component(loweredName, options);
    }

    export function bootstrap() {
        angular.element(window.document).ready(function () {
            let app = $(appClass);
            app.attr('ng-app', moduleName);
            angular.bootstrap(app, [moduleName]);
        });
    }
}

$(document).ready(() => {
    boilerplate.bootstrap();
});