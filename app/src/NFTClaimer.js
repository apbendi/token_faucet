import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from 'prop-types';

class NFTClaimer extends Component {
    constructor(props, context) {
        super(props);

        this.contract = context.drizzle.contracts.FaucetNFT;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.contract.methods.gimmeOne.cacheSend();
    }

    render() {
        return (
            <div>
               <button
                key="submit"
                className=""
                type="button"
                onClick={this.handleSubmit}
                >
                    Claim a FAN
                </button>
            </div>
        )
    }
}

NFTClaimer.contextTypes = {
    drizzle: PropTypes.object,
};

export default drizzleConnect(NFTClaimer, null);