class HttpService {

    _handleError(res){
        if(!res.ok) throw new Error(res.statusText)
        return res;
    }
    
    get(route){
        return fetch(route)
            .then(res => {
                return this._handleError(res);
            })
            .then(res => {
                return res.json();
            });
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