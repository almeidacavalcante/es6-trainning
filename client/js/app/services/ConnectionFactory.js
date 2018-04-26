var ConnectionFactory = (function(){
    const version = 5;
    const databaseName = 'transactions-project';
    var connection = null;
    var transactionList = new TransactionList();

    var stores = ['transactions'];
    
    return class ConnectionFacotory {
    
        constructor(){
            throw new Error('You cannot create an instance of ConnectionFactory, this is a static class');
        }
    
        static getConnection(){
    
            //devolve um Promise com a conexão
            return new Promise((resolve, reject) => {
    
                //Make a open request to the idb
                let openRequest = window.indexedDB.open(databaseName, version);
    
                //Tratar a tríade do openRequest;
                //Acessado na criação do idb
                openRequest.onupgradeneeded = e => {
                    console.log('Creating the database');
                    this.connection = e.target.result;

                    
                    //Se já houver algum store, exclua-os e crie novos stores;
                    
                    ConnectionFacotory._createStores(this.connection);
                }
    
                //Acessado na conexão do idb
                openRequest.onsuccess = e => {
                    console.log('Connected');

                    if(!this.connection) this.connection = e.target.result;

                    resolve(this.connection);
                }
    
                //Acessado quando há algum erro.
                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                }
            })
        }
    
        static _createStores(connection){
            if(!connection.objectStoreNames.contains(stores))
                connection.createObjectStore(stores, {autoIncrement: true});
        }
    }
})();
