module boilerplate.components {
    import IProxyService = boilerplate.services.IProxyService;
    
    export class Greeting implements ng.IComponentOptions {
        templateUrl = 'app/views/greeting.html';
        controller = ['proxyService', (proxyService: IProxyService) =>
            new boilerplate.controllers.GreetingController(proxyService)];
    }
}

boilerplate.registerComponent('Greeting', new boilerplate.components.Greeting());