class TransactionService {

    import(weekName, callback) {
        let xhr = new XMLHttpRequest();
        
        xhr.open('GET', `negociacoes/${weekName}`);

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200){

                    callback(null, this._generateTransactionList(xhr));

                }else{
                    callback('It could not import the transactions', null);
                }
            }
        }
        xhr.send();    
    }

    _generateTransactionList(xhr){

        let transactionList = new TransactionList();

        JSON.parse(xhr.responseText).map(jsonObject => new Transaction(new Date(jsonObject.data), jsonObject.quantidade, jsonObject.valor))
        .forEach(transaction => transactionList.add(transaction));
        
        return transactionList;
    }

}