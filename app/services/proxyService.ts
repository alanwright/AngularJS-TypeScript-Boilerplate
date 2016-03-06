module boilerplate.services {
    import IGreeting = boilerplate.contracts.IGreeting;
    
    export interface IProxyService {
        getGreeting: (id: string) => JQueryPromise<IGreeting>;
        postGreeting: (greeting: IGreeting) => JQueryPromise<IGreeting>;
    }

    export function createProxyService($http: ng.IHttpService): IProxyService {
        return new ProxyService($http);
    }

    class ProxyService implements IProxyService {
        constructor(private $http: ng.IHttpService) { }

        public getGreeting(id: string): JQueryPromise<IGreeting> {
            let deferred = $.Deferred();
            this.$http.get(/*'/greetings/' + id*/ 'data/db.json')
                .success((greeting: IGreeting) => {
                    deferred.resolve(greeting);
                })
                .error((reason: any) => {
                    deferred.reject(reason);
                });

            return deferred.promise();
        }
        
        public postGreeting(greeting: IGreeting): JQueryPromise<IGreeting> {
            let deferred = $.Deferred();
            let stringifyGreeting = JSON.stringify(greeting);

            this.$http.post('/greetings', stringifyGreeting)
                .success((response: any) => {
                    deferred.resolve(response.data);
                })
                .error((reason: any) => {
                    deferred.resolve(reason)
                });

            return deferred.promise();
        }
    }
}