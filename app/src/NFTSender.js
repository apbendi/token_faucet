import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from 'prop-types';

class NFTSender extends Component {
    constructor(props, context) {
        super(props);

        this.contract = context.drizzle.contracts.FaucetNFT;
        this.account = props.accounts[0];

        this.state = {
            inputAddress: "",
            dropDownSelection: "none",
            tokenIDsKey: this.contract.methods.tokensOfOwner.cacheCall(this.account),
            tokenIDs: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.contracts.FaucetNFT.initialized) {
            return;
        }

        if( !(this.state.tokenIDsKey in nextProps.contracts.FaucetNFT.tokensOfOwner) ) {
            return;
        }

        let tokenIDs = nextProps.contracts.FaucetNFT.tokensOfOwner[this.state.tokenIDsKey].value;
        this.setState({
            tokenIDs
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.dropDownSelection === "none") {
            return;
        }

        this.contract.methods.transferMine.cacheSend(this.state.inputAddress, this.state.dropDownSelection);
    }

    handleAddressChange(event) {
        event.preventDefault();

        this.setState({
            inputAddress: event.target.value,
        });
    }

    handleDropDownChange(event) {
        event.preventDefault();

        this.setState({
            dropDownSelection: event.target.value,
        });
    }

    render() {
        let tokenOptions = 
            this.state.tokenIDs.map( tokenID => {
                return (
                    <option value={tokenID} key={tokenID}>Token #{tokenID}</option>
                );
            });

        return (
            <div>
                <h4>Send a FAN</h4>
                <form>
                    <select 
                        defaultValue="none"
                        className="form-control"
                        onChange={this.handleDropDownChange}>
                        <option hidden disabled value="none">-- Token ID --</option>
                        {tokenOptions}
                    </select>
                    <br />
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Address"
                            value={this.state.inputAddress} 
                            onChange={this.handleAddressChange} />
                        <span className="input-group-btn">
                            <button
                                key="submit"
                                className="btn btn-danger"
                                type="button"
                                onClick={this.handleSubmit}>
                                <span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span>
                                {" "}
                                Send FAN
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        )
    }
}

NFTSender.contextTypes = {
    drizzle: PropTypes.object,
};

const mapStateToProps = state => {
    return {
      contracts: state.contracts,
      accounts: state.accounts,
    };
  };


export default drizzleConnect(NFTSender, mapStateToProps);
