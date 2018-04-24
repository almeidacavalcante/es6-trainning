class TransactionController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputDate = $('#data');
        this._inputQuantity = $('#quantidade');
        this._inputValue = $('#valor');

        this._transactionList = new Bind(
            new TransactionList(), 
            new TransactionView($('#transaction-view')),
            'add', 'clear'
        );

        this._message = new Bind(
            new Message(),
            new MessageView($('#message-view')),
            'text'
        );
    }

    clear(){

        this._transactionList.clear();
        this._message.text = 'Transactions List successfully cleared';
    }

    add(event) {

        event.preventDefault();
        this._transactionList.add(this._createTransaction());
        this._message.text = 'Transaction successfully included!';
        this._clear();
    }

    import(){

        let period = document.querySelector('#period').value;
        
        let service = new TransactionService();

        service.import(period)
            .then((transactionList) => {
                transactionList.transactions.forEach(transaction => {
                    this._transactionList.add(transaction);
                    this._message.text = 'Trasactions successfully imported';
                });
            })
            .catch(err => this._message.text = 'It could not reach the transactions')
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