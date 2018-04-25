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
    }

    showDatePicker(){
        console.log('show date picker!!');
    }

    clear(){

        this._transactionList.clear();
        this._message.text = 'Transactions List successfully cleared';
    }

    add(event) {


        event.preventDefault();
        let transaction = this._createTransaction();
        this.persist(transaction);
        this._transactionList.add(transaction);
        this._message.text = 'Transaction successfully included!';
        this._clear();
    }

    persist(transaction){
        ConnectionFactory.getConnection().then(connection => {
            ConnectionFactory.addTransaction(transaction);
        })
        
    }

    import(){

        let period = document.querySelector('#period').value;
        
        let service = new TransactionService();

        service.import(period)
            .then((promiseList) => {

                if(Array.isArray(promiseList)){
                    console.log('is Array');
                    promiseList.forEach(transactionList => {                        
                        transactionList.transactions.forEach(transaction => {
                            this._transactionList.add(transaction);
                            this._message.text = 'Trasactions successfully imported';
                        })
                    })              
                }else{
                    promiseList.transactions.forEach(transaction => {
                        this._transactionList.add(transaction);
                        this._message.text = 'Trasactions successfully imported';
                    });
                }
            })
            .catch(err => this._message.text = 'It could not reach the transactions')
    }

    sort(column){
        console.log(column);
        console.log(this._currentColumn);
        
        
        if(this._currentColumn == column){         
            this._transactionList.invertedSort();
        }else{
            this._transactionList.sort((a, b) => a[column] - b[column])
        }

        this._currentColumn = column;

    }

    _createTransaction(){

        let date = DateHelper.stringToDate(this._inputDate.value)

        return new Transaction(
            date,
            this._inputQuantity.value,
            this._inputValue.value 
        )      
    }

    _clear(){
        this._inputDate.value = '';
        this._inputQuantity.value = 1;
        this._inputValue.value = 0.0;

        this._inputDate.focus();
    }
}