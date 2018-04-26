class TransactionDAO {

    constructor(connection){
        this._connection = connection;
        this._store = 'transactions';
        this._transactionList = new TransactionList();
    }

    fetch(){

        return new Promise((resolve, reject) => {

            let cursor = this
                ._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();
        
            cursor.onsuccess = e => {

                let iterator = e.target.result;
                if(iterator){
                    let transaction = iterator.value;
                    this._transactionList.add(new Transaction(transaction._date, transaction._quantity, transaction._value));
                    iterator.continue();
                }else{
                    console.log(this._transactionList);
                    resolve(this._transactionList);
                }
            }
            
            cursor.onerror = e => {
                console.log(e.target.error);
                reject('You could not fetch the transactions');
            }
        })
    }

    removeAll(){
        
        return new Promise((resolve, reject) => {
            let request = this
                ._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();
            
            request.onsuccess = e => {
                resolve('Transactions Removed Successfully');
            }

            request.onerror = e => {
                console.log(e.target.error);
                reject('You could not remove the transactions');
            }
        })
    }

    add(transaction){
        return new Promise((resolve, reject) => {
            let request = this
                ._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(transaction);
            
            request.onsuccess = e => {
                resolve();
            }

            request.onerror = e => {
                console.log(e.target.error);
                reject('You could not add the transaction');
            }
        })
    }
}