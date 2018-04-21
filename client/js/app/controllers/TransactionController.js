class TransactionController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputDate = $('#data');
        this._inputQuantity = $('#quantidade');
        this._inputValue = $('#valor');

        this._transactionList = new TransactionList();
        this._transactionView = new TransactionView($('#transaction-view'));

        this._message = new Message();
        this._messageView = new MessageView($('#message-view'));
    }

    add(event) {

        event.preventDefault();

        this._transactionList.add(this._createTransaction());

        this._message.text = 'Transaction successfully included!';
        this._messageView.update(this._message);

        this._clear();
        
        this._transactionView.update(this._transactionList);
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