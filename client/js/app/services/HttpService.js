class HttpService {

    get(route){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
        
            xhr.open('GET', route);
    
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(this._generateTransactionList(xhr));
                    }else{
                        reject('It could not import the transactions');
                    }
                }
            }
            xhr.send();  
        })

    }

    
    _generateTransactionList(xhr){

        let transactionList = new TransactionList();

        JSON.parse(xhr.responseText).map(jsonObject => new Transaction(new Date(jsonObject.data), jsonObject.quantidade, jsonObject.valor))
        .forEach(transaction => transactionList.add(transaction));
        
        return transactionList;
    }
}