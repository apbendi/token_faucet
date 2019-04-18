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

const MyComponent = (props, context) => {
  const utils = context.drizzle.web3.utils;

  let accounts = props.accounts;
  let isTokenSynced = props.FaucetToken.synced;

  const renderTokenAmount = (rawAmount) => {
    if (typeof rawAmount !== 'string' && typeof rawAmount !== 'number') {
      return "";
    }

    // Sort of a hack-- works because our token has the same
    // number of decimals (18) as wei => eth
    // TODO: explore how this func uses BN to get this value w/o poor performance
    return utils.fromWei(rawAmount, 'ether');
  };

  const renderTokenAmountWithPending = (rawAmount) => {
    let displayAmount = renderTokenAmount(rawAmount);

    if (isTokenSynced) {
      return displayAmount;
    } else {
      return displayAmount + " 🔄";
    }
  }

  return (
    <div className="container">
      <div className="page-header top-page-header">
        <h1>Faucet Token <small>ERC 20</small></h1>
      </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                  {" "}My Balance
                </h3>
              </div>
              <div className="panel-body">
                <ContractData
                  contract="FaucetToken"
                  method="balanceOf"
                  methodArgs={[accounts[0]]}
                  render={renderTokenAmountWithPending} />
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
              <div className="panel-heading">
                <span className="glyphicon glyphicon-globe" aria-hidden="true"></span>
                {" "}Global Supply
              </div>
              <div className="panel-body">
                <ContractData
                  contract="FaucetToken"
                  method="totalSupply"
                  methodArgs={[{ from: accounts[0] }]}
                  render={renderTokenAmountWithPending} />
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
              Request Tokens{" "}
                <small><span className="label label-warning">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>{" "}
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
                <h3 className="panel-title">
                  <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                  {" "}My Unique Tokens
                </h3>
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
              <div className="panel-heading">
              <span className="glyphicon glyphicon-globe" aria-hidden="true"></span>
                {" "}Global Unique Tokens
              </div>
              <div className="panel-body">
              <ContractData contract="FaucetNFT" method="totalSupply" />
                {" "}
                <ContractData contract="FaucetNFT" method="symbol" hideIndicator />
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        
          <div className="row">
          <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="panel panel-success">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    <span className="glyphicon glyphicon-list" aria-hidden="true"></span>
                    {" "}My Tokens by ID
                  </h3>
                </div>
                <div className="panel-body">
                  <ContractData
                      contract="FaucetNFT"
                      method="tokensOfOwner"
                      methodArgs={[accounts[0]]} />
                </div>
              </div>
            </div>
          </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-6">
            <NFTClaimer />
          </div>
        </div>

        <br />
                
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-6">
            <NFTSender />
          </div>
        </div>
      </div>
  );
}

MyComponent.contextTypes = {
  drizzle: PropTypes.object,
};

export default MyComponent;
