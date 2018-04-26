class TransactionService {

    constructor(){
        this._http = new HttpService();
    }

    add(transaction){
        return new Promise((resolve, reject) => {
            ConnectionFactory
            .getConnection()
            .then(connection => new TransactionDAO(connection))
            .then(dao => dao.add(transaction))
            .then(() => resolve('Transaction successfully included!'))
            .catch((e) => {
                console.log(e.target.error);
                reject('You could not persist the transaction');
            })
        })
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