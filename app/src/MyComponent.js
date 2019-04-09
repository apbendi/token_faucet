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
        <ContractData contract="FaucetToken" method="symbol" hideIndicator />
      </p>
      <p>
        <strong>My Balance: </strong>
        <ContractData
          contract="FaucetToken"
          method="balanceOf"
          methodArgs={[accounts[0]]} />
      </p>
      <p>
        <strong>Request FAT</strong><br />
        <small>(maximum of <ContractData contract="FaucetToken" method="faucet_max" />)</small><br /><br />
        <ContractForm contract="FaucetToken" method="getMeSome" labels={["Amount"]} />
      </p>
      <p>
        <h3>Send Tokens</h3>
        <ContractForm
          contract="FaucetToken"
          method="transfer"
          labels={["To Address", "Amount to Send"]}
        />
      </p>
    </div>
  </div>
);
