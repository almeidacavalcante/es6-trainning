
class TransactionList {

    constructor(){
        
        this._transactionList = [];
    }

    add(transaction){

        this._transactionList.push(transaction);
    }

    get transactions(){

        return [].concat(this._transactionList);
    }
}