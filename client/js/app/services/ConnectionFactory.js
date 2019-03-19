let ConnectionFactory = (function () {
    let stores = ['negociacoes'];
    let version = 4;
    let dbName = 'aluraframe';
    let connection = null;
    
    return class ConnectionFactory {
    
        contructor(){
            throw new Error('Não é possível criar instâncias de ConnectionFactory');
        }
        
        static getConnection(){
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);
                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createConnection(e.target.result);
                };
                openRequest.onsuccess = e => {
                    if(!connection){
                        connection = e.target.result;
                        connection.close = function() {
                            throw new Error('A conexão não pode ser fechada diretamente.');
                        };
                    }
                    resolve(connection);
                };
                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }
    
        static _createConnection(connection){
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, { autoIncrement: true});
            });
        }

        static closeConnection(){
            if(connection){
                connection.close();
                connection = null;
            }
        }
    }
})();
