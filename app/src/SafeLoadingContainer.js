import { drizzleConnect } from "drizzle-react";
import React, { Children, Component } from "react";
import PropTypes from "prop-types";

class SafeLoadingContainer extends Component {
    constructor(props) {
        super(props);
    }

    isValidNetwork(networkId) {
        return networkId === 3 || networkId === 5777;
    }

    render() {
        var body = "";

        let isWeb3Ready = this.props.web3Info.status === "initialized" && 
                                this.props.web3Info.networkId !== undefined;
        
        let isInvalidNetwork = isWeb3Ready && 
                                !this.isValidNetwork(this.props.web3Info.networkId);

        let isWeb3Failure = this.props.web3Info.status === "failed" || (
                                        this.props.web3Info.status === "initialized" &&
                                        Object.keys(this.props.accounts).length === 0
                                    );

        let isLoadingDrizzle = !this.props.drizzleStatus.initialized;

        if (isInvalidNetwork) {
            return (
                <div className="container">
                    Network is not supported
                </div>
            );
        } else if (isWeb3Failure) {
            return (
                <div className="container">
                    No Web3 Found
                </div>
            );
        } else if (isLoadingDrizzle) {
            return (
                <div className="container">
                    Loading...
                </div>
            );   
        } else {
            return Children.only(this.props.children);
        }
    }
}

SafeLoadingContainer.contextTypes = {
    drizzle: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        drizzleStatus: state.drizzleStatus,
        web3Info: state.web3,
    };
};

export default drizzleConnect(SafeLoadingContainer, mapStateToProps);
