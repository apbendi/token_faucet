import React from "react";
import PropTypes from 'prop-types';

import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";

import TokenSender from './TokenSender'
import TokenRequester from "./TokenRequester";

const MyComponent = ({ accounts }, context) => {
  const utils = context.drizzle.web3.utils;

  const renderTokenAmount = (rawAmount) => {
    // Sort of a hack-- works because our token has the same
    // number of decimals (18) as wei => eth
    // TODO: explore how this func uses BN to get this value w/o poor performance
    return utils.fromWei(rawAmount, 'ether');
  };

  return (
    <div className="App">
      <div className="section">
        <h2>FaucetToken</h2>
        <p>
          <strong>Total Supply: </strong>
          <ContractData
            contract="FaucetToken"
            method="totalSupply"
            methodArgs={[{ from: accounts[0] }]}
            render={renderTokenAmount} />
          {" "}
          <ContractData
            contract="FaucetToken"
            method="symbol"
            hideIndicator />
        </p>
        <p>
          <strong>My Balance: </strong>
          <ContractData
            contract="FaucetToken"
            method="balanceOf"
            methodArgs={[accounts[0]]}
            render={renderTokenAmount} />
        </p>
        <p>
          <strong>
            Request {" "}
            <ContractData
              contract="FaucetToken"
              method="symbol"
              hideIndicator />
          </strong>
          <br />
          <small>(maximum of{" "}
            <ContractData contract="FaucetToken" 
              method="faucetMax" 
              render={renderTokenAmount}
              />)
          </small>
        </p>
        <TokenRequester />
        <p>
          <strong>Send Tokens</strong>
        </p>
        <TokenSender />
        <h2><ContractData contract="FaucetNFT" method="name" /></h2>
        <p>
          <strong>Total Unique Tokens</strong>:{" "}
          <ContractData contract="FaucetNFT" method="totalSupply" />{" "}
          <ContractData contract="FaucetNFT" method="symbol" />
        </p>
        <p>
          <strong>Unique Tokens Owned by You</strong>:
        <ContractData
            contract="FaucetNFT"
            method="balanceOf"
            methodArgs={[accounts[0]]} />
        </p>
        <div>
          <strong>Claim A Token</strong>:
        <ContractForm
            contract="FaucetNFT"
            method="gimmeOne" />
        </div>
        <br /><br />
        <div>
          <strong>Send A Token</strong>:
        <ContractForm
            contract="FaucetNFT"
            method="transferMine" />
        </div>
      </div>
    </div>
  );
}

MyComponent.contextTypes = {
  drizzle: PropTypes.object,
};

export default MyComponent;
