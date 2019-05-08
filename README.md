# Token Faucet 🚰

Easily mintable tokens conforming to the [ERC20](https://en.wikipedia.org/wiki/ERC-20) and [ER721](http://erc721.org/) standards. Useful for testing  other smart contracts or applications which interact with these standard tokens. Available at [tokenfaucet.casa](https://tokenfaucet.casa).

## Usage

### Requirements

* A web3 enabled browser or browser extension
	* [Brave](https://brave.com/) - Desktop Browser w/ MetaMask by default
	* [MetaMask](https://metamask.io/) - Extension for Chrome and Firefox
	* [Cipher](https://www.cipherbrowser.com/) - Web3 enabled mobile browser
* Some Ether to pay for gas fees
   * [Testnet Faucet](https://faucet.metamask.io/) - Gives out free ETH on most Ethereum testnets

### Instructions

1. Navigate to [tokenfaucet.casa](https://tokenfaucet.casa) with a web3 enabled browser
2. Allow Token Faucet to access web3 when prompted
3. Use the interface to mint or send tokens

Alternatively, if you are writing a smart contract, you can also interact with the contracts from yours using their [public](https://github.com/apbendi/token_faucet/blob/master/contracts/FaucetToken.sol) [interfaces](https://github.com/apbendi/token_faucet/blob/master/contracts/FaucetNFT.sol).

## Networks

Token Faucet is currently deployed on the Ropsten testnet. Other testnets, and possibly mainnet, coming soon.

Network | ERC20 Address| ERC721 Address
------- | -------------| --------------
Ropsten | [0x66bb289cb653567e7b2f25d76844048d816d065e](https://ropsten.etherscan.io/address/0x66bb289cb653567e7b2f25d76844048d816d065e)|[0xce9df8a050deadef05d9983a88649db0f782d545](https://ropsten.etherscan.io/address/0xce9df8a050deadef05d9983a88649db0f782d545)

## Development

### Requirements

Token Faucet is built using the Truffle suite of DApp developer tools. In particular, development requires:

* [Truffle](https://truffleframework.com/truffle) v5.0.10 or later
* [Solidity](https://solidity.readthedocs.io/en/v0.5.0/installing-solidity.html) v0.5.0 or later
* [Ganache](https://truffleframework.com/ganache) v2.0.0 or later

The frontend is built with React and [Drizzle](https://truffleframework.com/drizzle). In particular, the following development tools are needed:

* Node v10.8.0 or later
* npm v6.2.0 or later

### Instructions

* Clone the repository

```bash
git clone https://github.com/apbendi/token_faucet.git
cd token_faucet
```

* Run the Ganache desktop app (or `ganache-cli`)
* Migrate the contracts using Truffle

```bash
truffle migrate
```

* Build and run the frontend locally

```bash
cd app
npm start
```

* Open a web3 enabled browser and navigate to `localhost:3000`

### Contributions

Contributions to the frontend are welcome! In particular, the current design uses the vanilla Bootstrap theme, and help improving it would be appreciated. Simply fork the project, create a new branch from master, and open a PR.

The smart contracts are deployed, and therefore considered finalized, unless we decide to upgrade Token Faucet completely in the future.

## License

Token Faucet is made available under the [MIT](LICENSE.txt) license.

Copyright (2019) Ben DiFrancesco.
