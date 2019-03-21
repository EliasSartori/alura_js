'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, STORES, VERSION, DBNAME, connection, close, ConnectionFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            STORES = ['negociacoes'];
            VERSION = 4;
            DBNAME = 'aluraframe';
            connection = null;
            close = null;

            _export('ConnectionFactory', ConnectionFactory = function () {
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);
                }

                _createClass(ConnectionFactory, [{
                    key: 'contructor',
                    value: function contructor() {
                        throw new Error('Não é possível criar instâncias de ConnectionFactory');
                    }
                }], [{
                    key: 'getConnection',
                    value: function getConnection() {
                        return new Promise(function (resolve, reject) {
                            var openRequest = window.indexedDB.open(DBNAME, VERSION);
                            openRequest.onupgradeneeded = function (e) {
                                ConnectionFactory._createConnection(e.target.result);
                            };
                            openRequest.onsuccess = function (e) {
                                if (!connection) {
                                    connection = e.target.result;
                                    close = connection.close;
                                    connection.close = function () {
                                        throw new Error('A conexão não pode ser fechada diretamente.');
                                    };
                                }
                                resolve(connection);
                            };
                            openRequest.onerror = function (e) {
                                console.log(e.target.error);
                                reject(e.target.error.name);
                            };
                        });
                    }
                }, {
                    key: '_createConnection',
                    value: function _createConnection(connection) {
                        STORES.forEach(function (store) {
                            if (connection.objectStoreNames.contains(store)) {
                                connection.deleteObjectStore(store);
                            }
                            connection.createObjectStore(store, { autoIncrement: true });
                        });
                    }
                }, {
                    key: 'closeConnection',
                    value: function closeConnection() {
                        if (connection) {
                            close;
                            connection = null;
                        }
                    }
                }]);

                return ConnectionFactory;
            }());

            _export('ConnectionFactory', ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map