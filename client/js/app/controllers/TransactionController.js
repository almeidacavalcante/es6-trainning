class TransactionController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#data');
        this._inputQuantity = $('#quantidade');
        this._inputValue = $('#valor');
        this._transactionList = new TransactionList();
        //Object.freeze(this);
    }

    add(event) {

        event.preventDefault();

        console.log(this._inputDate.value);

        this._transactionList.add(this._createTransaction());
        this._clear();

        console.log(this._transactionList.transactions);
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