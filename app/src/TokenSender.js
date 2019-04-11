import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from 'prop-types';

class TokenSender extends Component {

    constructor(props, context) {
        super(props);

        this.state = {
            inputSendAmount: "",
            inputAddress: ""
        };

        this.contract = context.drizzle.contracts["FaucetToken"];
        this.utils = context.drizzle.web3.utils;

        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAmountChange(event) {
        event.preventDefault();

        this.setState({
            inputSendAmount: event.target.value
        });
    }

    handleAddressChange(event) {
        event.preventDefault();

        this.setState({
            inputAddress: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let amount = this.utils.toWei(this.state.inputSendAmount);
        this.contract.methods.transfer.cacheSend(this.state.inputAddress, amount);
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        Amount:
                        <input type="text" value={this.state.inputSendAmount} onChange={this.handleAmountChange} />
                    </label>
                    <label>
                        Address:
                        <input type="text" value={this.state.inputAddress} onChange={this.handleAddressChange} />
                    </label>
                    <button
                        key="submit"
                        className=""
                        type="button"
                        onClick={this.handleSubmit}
                    >
                        Send Them
                    </button>
                </form>                
            </div>
        )
    }
}

TokenSender.contextTypes = {
    drizzle: PropTypes.object,
};

export default drizzleConnect(TokenSender, null);
  