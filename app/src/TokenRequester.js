import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { isNull } from "util";

class TokenRequester extends Component {

    constructor(props, context) {
        super(props);

        this.contract = context.drizzle.contracts["FaucetToken"];
        this.utils = context.drizzle.web3.utils;

        this.state = {
            inputAmount: "",
            maxDataKey: this.contract.methods.faucetMax.cacheCall(),
            maxAmount: { display: "", bigNumber: null }
        }

        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if ( !isNull(this.state.maxAmount.bigNumber) ) {
            return;
        }

        if (!nextProps.contracts.FaucetToken.initialized) {
            return;
        }

        if( !(this.state.maxDataKey in nextProps.contracts.FaucetToken.faucetMax) ) {
            return;
        }

        let rawValue = nextProps.contracts.FaucetToken.faucetMax[this.state.maxDataKey].value;
        this.setState({
            maxAmount: {
                display: this.utils.fromWei(rawValue, 'ether'),
                bigNumber: this.utils.toBN(rawValue)
            }
        });
    }

    handleAmountChange(event) {
        event.preventDefault();

        this.setState({
            inputAmount: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let amount = this.utils.toWei(this.state.inputAmount);
        this.contract.methods.getMeSome.cacheSend(amount, {value: this.utils.toWei('0.0', 'ether')});
    }

    render() {
        let maxPlaceholder = "Max of " +  this.state.maxAmount.display;

        return (
            <div>
                <div className="input-group">
                    <input type="text" 
                        className="form-control" 
                        placeholder={maxPlaceholder} 
                        value={this.state.inputAmount}
                        onChange={this.handleAmountChange} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" 
                            type="button" 
                            onClick={this.handleSubmit}>
                            Get FAT
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

TokenRequester.contextTypes = {
    drizzle: PropTypes.object,
};

const mapStateToProps = state => {
    return {
      contracts: state.contracts,
    };
  };

export default drizzleConnect(TokenRequester, mapStateToProps);