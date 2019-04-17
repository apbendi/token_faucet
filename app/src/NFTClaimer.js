import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from 'prop-types';

class NFTClaimer extends Component {
    constructor(props, context) {
        super(props);

        this.contract = context.drizzle.contracts.FaucetNFT;
        this.utils = context.drizzle.web3.utils;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.contract.methods.gimmeOne.cacheSend({value: this.utils.toWei('0', 'ether')});
    }

    render() {
        return (
            <div>
                <h4>Request a FAN</h4> 
               <button
                key="submit"
                className="btn btn-success"
                type="button"
                onClick={this.handleSubmit}
                >
                    <span className="glyphicon glyphicon-circle-arrow-down" aria-hidden="true"></span>
                    {" "}
                    Claim a Unique FAN
                </button>
            </div>
        )
    }
}

NFTClaimer.contextTypes = {
    drizzle: PropTypes.object,
};

export default drizzleConnect(NFTClaimer, null);