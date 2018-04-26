class TransactionController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputDate = $('#data');
        this._inputQuantity = $('#quantidade');
        this._inputValue = $('#valor');
        this._currentColumn = ''; 

        this._transactionList = new Bind(
            new TransactionList(), 
            new TransactionView($('#transaction-view')),
            'add', 'clear', 'sort', 'invertedSort'
        );

        this._message = new Bind(
            new Message(),
            new MessageView($('#message-view')),
            'text'
        );

        this._service = new TransactionService();

        this._fetch();
    }

    showDatePicker(){
        console.log('show date picker!!');
    }

    clear(){
        this._transactionList.clear();
        this._message.text = 'Transactions List successfully cleared';
    }

    add(event=null) {
        if(event) event.preventDefault();

        let transaction = this._createTransaction();

        this._service
            .add(transaction)
            .then((message) => {
                this._message.text = message;
                this._transactionList.add(transaction);
                this._clear();
            })
            .catch((message)=>{
                this._message.text = message;
            });
    }

    removeAll(){
        ConnectionFactory.getConnection().then((connection) => {
            new TransactionDAO(connection).removeAll().then((message) => {
                this._message.text = message;
                this.clear();
            })
            .catch((message) =>{
                this._message.text = message;
            })
        })
    }

    _fetch(){
        ConnectionFactory.getConnection().then((connection) => {
            new TransactionDAO(connection).fetch().then((transactionList) => {
                transactionList.transactions.forEach(transaction => {
                    this._transactionList.add(transaction);
                })
            })
        })
    }

    addImportedTransaction(transaction){
        this._service.add(transaction).then((message) => {
            this._transactionList.add(transaction);
            this._message.text = message;
        })
    }

    import(){
        let period = document.querySelector('#period').value;

        this._service.import(period)
            .then((promiseList) => {

                if(Array.isArray(promiseList)){
                    promiseList.forEach(transactionList => {                        
                        transactionList.transactions.forEach(transaction => {
                            this.addImportedTransaction(transaction);
                        })
                    })              
                }else{
                    promiseList.transactions.forEach(transaction => {
                        this.addImportedTransaction(transaction);
                    });
                }
            })
            .catch(err => this._message.text = 'It could not reach the transactions' + err)
    }

    sort(column){   

        if(this._currentColumn == column){         
            this._transactionList.invertedSort();
        }else{
            this._transactionList.sort((a, b) => a[column] - b[column])
        }

        this._currentColumn = column;

    }

    _createTransaction(){

        return new Transaction(
            DateHelper.stringToDate(this._inputDate.value),
            parseInt(this._inputQuantity.value),
            parseFloat(this._inputValue.value) 
        )      
    }

    _clear(){
        this._inputDate.value = '';
        this._inputQuantity.value = 1;
        this._inputValue.value = 0.0;

        this._inputDate.focus();
    }
}