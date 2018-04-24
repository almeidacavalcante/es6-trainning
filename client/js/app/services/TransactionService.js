class TransactionService {

    constructor(){
        this._http = new HttpService();
    }

    import(period) {
        if(period != 'todos'){

            return this._http.get(`negociacoes/${period}`);

        }else{
            
            let promise = Promise.all([
                this._http.get(`negociacoes/semana`),
                this._http.get(`negociacoes/anterior`),
                this._http.get(`negociacoes/retrasada`)
            ]);

            let transactionListFlat = new TransactionList();

            promise.then((transactionListAll) => {
                transactionListAll.reduce((flatList, list) => flatList.concat(list), [])
                    .forEach(transactionList => {
                        console.log(transactionList);
                        
                        transactionList.forEach(transaction => {
                            transactionListFlat.add(transaction)
                        }) 
                    });
            })

            let flatPromise = new Promise((resolve, reject) => {
                resolve(transactionListFlat);
            })

            return flatPromise;
        }
        
    }
}