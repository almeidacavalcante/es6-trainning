
var connection;
var transactions = [];

openConnection();


function openConnection(){
    let version = 5;

    let openRequest = window.indexedDB.open('transactions-project', version);

    openRequest.onupgradeneeded = e => {
        console.log('Creating or updating the database');
        
        this.connection = e.target.result;
        connection.createObjectStore('transactions', {autoIncrement: true});

    }

    openRequest.onsuccess = e => {
        console.log('Connected');
        this.connection = e.target.result;

        let transactionObject = new Transaction(new Date(), 123, 123);
        addTransaction(transactionObject);
    }

    openRequest.onerror = e => {
        console.log(e.target.error);
        
    }
}

function fetchTransactions(){
    let store = this.connection.transaction(['transactions'], 'readwrite').objectStore('transactions');
    let cursor = store.openCursor();

    cursor.onsuccess = e => {
        let current = e.target.result;
        if(current){
            let object = current.value;
            transactions.push(new Transaction(object._date, object._quantity, object._value));
            current.continue();
        }else{
            console.log(transactions);
        }
    }
    
    cursor.onerror = e => {
        console.log(e.target.error.name);
    }
}

function addTransaction(object){
    let store = this.connection.transaction(['transactions'], 'readwrite').objectStore('transactions');
    let request = store.add(object);
}