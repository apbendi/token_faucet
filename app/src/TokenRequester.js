import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from 'prop-types';

class TokenRequester extends Component {

    constructor(props, context) {
        super(props);

        this.state = {
            inputAmount: "",
        }

        this.contract = context.drizzle.contracts["FaucetToken"];
        this.utils = context.drizzle.web3.utils;

        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.contract.methods.getMeSome.cacheSend(amount);
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        Amount:
                        <input type="text" value={this.state.inputAmount} onChange={this.handleAmountChange} />
                    </label>
                    <button key="submit" type="button" onClick={this.handleSubmit}>
                        Get FAT
                    </button>
                </form>
            </div>
        );
    }
}

TokenRequester.contextTypes = {
    drizzle: PropTypes.object,
};

export default drizzleConnect(TokenRequester, null);