'use strict'

var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = 'pole noise auction waste favorite shield gallery initial elite kitchen physical always';

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      gas: 4000000,
      network_id: "*"
    },
    tomotestnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 'https://testnet.tomochain.com');
      },
      gas: 4000000,
      gasprice: 0,
      network_id: 89
    }
  }
};
