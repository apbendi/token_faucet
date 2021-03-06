import MyComponent from "./MyComponent";
import { drizzleConnect } from "drizzle-react";

const mapStateToProps = state => {
  return {
      accounts: state.accounts,
      FaucetToken: state.contracts.FaucetToken,
      drizzleStatus: state.drizzleStatus,
      web3: state.web3,
  };
};

const MyContainer = drizzleConnect(MyComponent, mapStateToProps);

export default MyContainer;
