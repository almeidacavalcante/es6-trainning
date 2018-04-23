
class TransactionList {

    constructor(){

        this._transactionList = [];

    }

    add(transaction){

        this._transactionList.push(transaction);
    }

    clear(){
        
        this._transactionList = [];
    }

    get transactions(){

        return [].concat(this._transactionList);
    }

    get totalVolume(){
        return this._transactionList.reduce((total, next) => total + next.volume, 0.0);
    }
}