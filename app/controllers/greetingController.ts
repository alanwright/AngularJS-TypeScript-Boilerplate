module boilerplate.controllers {
    import IGreeting = boilerplate.contracts.IGreeting;
    import IProxyService = boilerplate.services.IProxyService;
    
    export class GreetingController {
        private proxyService: IProxyService;
        
        public greeting: IGreeting;
        
        constructor(proxyService: IProxyService) {
            this.proxyService = proxyService;
            this.setup();
        }
        
        private setup(): void {
            this.proxyService.getGreeting('1').then((response: any) => {
                this.greeting = response;
            });
        }
    }
}