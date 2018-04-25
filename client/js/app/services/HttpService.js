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

    post(route, data){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', route, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onreadystatechange = () => {
                if(xhr.status == 200){
                    
                    resolve("POST completed");
                }else{
                    reject("It could not reach the serve");
                }
            }
            let jsonString = JSON.stringify(data);          
            xhr.send(jsonString);
        })
    }

    
    _generateTransactionList(xhr){

        let transactionList = new TransactionList();

        JSON.parse(xhr.responseText).map(jsonObject => new Transaction(new Date(jsonObject.data), jsonObject.quantidade, jsonObject.valor))
        .forEach(transaction => transactionList.add(transaction));
        
        return transactionList;
    }
}