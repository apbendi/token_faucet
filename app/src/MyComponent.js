import React from "react";
import PropTypes from 'prop-types';

import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";

import TokenSender from './TokenSender'
import TokenRequester from "./TokenRequester";
import NFTClaimer from "./NFTClaimer";
import NFTSender from "./NFTSender";

const MyComponent = ({ accounts }, context) => {
  const utils = context.drizzle.web3.utils;

  const renderTokenAmount = (rawAmount) => {
    // Sort of a hack-- works because our token has the same
    // number of decimals (18) as wei => eth
    // TODO: explore how this func uses BN to get this value w/o poor performance
    return utils.fromWei(rawAmount, 'ether');
  };

  return (
    <div>
      <div>
      <div className="page-header">
        <h1>Faucet Token <small>ERC 20</small></h1>
      </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">My Balance</h3>
              </div>
              <div className="panel-body">
                <ContractData
                  contract="FaucetToken"
                  method="balanceOf"
                  methodArgs={[accounts[0]]}
                  render={renderTokenAmount} />
                  {" "}
                <ContractData
                  contract="FaucetToken"
                  method="symbol"
                  hideIndicator />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-warning">
              <div className="panel-heading">Global Supply</div>
              <div className="panel-body">
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
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>


        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-6">
            <h4>
              Request {" "}
              <ContractData
                contract="FaucetToken"
                method="symbol"
                hideIndicator />{" "}
                <small><span className="label label-warning">
                  max of{" "}
                  <ContractData contract="FaucetToken" 
                    method="faucetMax" 
                    render={renderTokenAmount}
                    hideIndicator
                    />
                  </span></small>
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-6">
            <TokenRequester />
          </div>
        </div>
        
        <br />

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-6">
            <h4>Send Tokens</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-6">
            <TokenSender />
          </div>
        </div>

        <div className="page-header">
          <h1>Faucet NFT <small>ERC 721</small></h1>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <div className="panel panel-success">
              <div className="panel-heading">
                <h3 className="panel-title">My Unique Tokens</h3>
              </div>
              <div className="panel-body">
                <ContractData
                  contract="FaucetNFT"
                  method="balanceOf"
                  methodArgs={[accounts[0]]} />
                {" "}
                <ContractData
                  contract="FaucetNFT"
                  method="symbol"
                  hideIndicator />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-warning">
              <div className="panel-heading">Global Unique Tokens</div>
              <div className="panel-body">
              <ContractData contract="FaucetNFT" method="totalSupply" />
                {" "}
                <ContractData contract="FaucetNFT" method="symbol" />
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div>
          <strong>Your Tokens by ID</strong>:
          <ContractData
            contract="FaucetNFT"
            method="tokensOfOwner"
            methodArgs={[accounts[0]]} />
        </div>
        <NFTClaimer />
        <NFTSender />
      </div>
    </div>
  );
}

MyComponent.contextTypes = {
  drizzle: PropTypes.object,
};

export default MyComponent;
