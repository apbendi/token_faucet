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
                    <div>
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Amount"
                            value={this.state.inputSendAmount} 
                            onChange={this.handleAmountChange} />
                    </div>
                    <br />
                    <div className="input-group">
                        <input type="text" 
                            className="form-control" 
                            placeholder="Address"
                            value={this.state.inputAddress}
                            onChange={this.handleAddressChange} />
                        <span className="input-group-btn">
                            <button className="btn btn-danger" 
                                type="button" 
                                onClick={this.handleSubmit}>
                                Send FAT
                            </button>
                        </span>
                    </div>
                </form>                
            </div>
        )
    }
}

TokenSender.contextTypes = {
    drizzle: PropTypes.object,
};

export default drizzleConnect(TokenSender, null);
  