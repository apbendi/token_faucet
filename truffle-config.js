const testnet = require('./testnet-mneumonic');
const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");


module.exports = {
    contracts_build_directory: path.join(__dirname, "app/src/contracts"),

    networks: {
	ropsten: {
	    provider: function() {
		return new HDWalletProvider(testnet.mneumonic, "https://ropsten.infura.io/v3/" + testnet.infura_id);
	    },
	    network_id: '3',
	    gas: 4000000
	}
    }
};
