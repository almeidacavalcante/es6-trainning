class TransactionService {

    constructor(){
        this._http = new HttpService();
    }

    import(period) {
        if(period != 'todos'){

            return this._http.get(`negociacoes/${period}`);

        }else{
            return Promise.all([
                this._http.get(`negociacoes/semana`),
                this._http.get(`negociacoes/anterior`),
                this._http.get(`negociacoes/retrasada`)
            ]);
        }    
    }
}