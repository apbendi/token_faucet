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
          methodArgs={[{ from: accounts[0] }]}/>
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
    </div>
  </div>
);
