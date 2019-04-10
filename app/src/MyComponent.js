import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";

export default ({ accounts }) => (
  <div className="App">
    <div className="section">
      <h2>FaucetToken</h2>
      <p>
        <strong>Total Supply: </strong>
        <ContractData
          contract="FaucetToken"
          method="totalSupply"
          methodArgs={[{ from: accounts[0] }]} />
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
          methodArgs={[accounts[0]]} />
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
        <small>(maximum of <ContractData contract="FaucetToken" method="faucetMax" />)</small>
      </p>
      <ContractForm
        contract="FaucetToken"
        method="getMeSome"
        labels={["Amount"]} />
      <p>
        <strong>Send Tokens</strong>
      </p>
      <ContractForm
        contract="FaucetToken"
        method="transfer"
        labels={["To Address", "Amount to Send"]}
      />
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
