class Transaction {

    constructor (date, quantity, value){
        this._date = new Date(date.getTime());
        this._quantity = quantity;
        this._value = value;

        Object.freeze(this);
    }

    get volume(){
        return this.quantity * this.value;
    }

    get quantity(){
        return this._quantity;
    }

    get value(){
        return this._value;
    }

    get date(){
        return new Date(this._date.getDate());
    }

    get stringDate(){
        return DateHelper.toString(this._date);
    }
}