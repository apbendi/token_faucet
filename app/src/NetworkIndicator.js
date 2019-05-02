import { drizzleConnect } from "drizzle-react";
import React, { Component } from "react";
import PropTypes from 'prop-types';

class NetworkIndicator extends Component {
  constructor(props, context) {
    super(props)

    this.getNetworkType = context.drizzle.web3.eth.net.getNetworkType;

    this.state = {
      networkID: null,
      networkType: "Loading"      
    }

    this.loadNetworkType = this.loadNetworkType.bind(this)
  }

  componentDidMount() {
    this.loadNetworkType(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadNetworkType(nextProps);
  }

  loadNetworkType(props) {
    let isInitialized = props.drizzleStatus.initialized && props.web3Info.status === "initialized";
    if (!isInitialized) {
      return;
    }

    if (this.state.networkID === props.web3Info.networkID) {
      return;
    }

    this.getNetworkType().then( type => {
      this.setState({
        networkID: props.networkID,
        networkType: type
      });
    });
  }

  render() {
    let networkName = this.state.networkType.charAt(0).toUpperCase() + this.state.networkType.slice(1);

    return (
      <div>
        {networkName}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      drizzleStatus: state.drizzleStatus,
      web3Info: state.web3
  };
};

NetworkIndicator.contextTypes = {
  drizzle: PropTypes.object,
};
  
export default drizzleConnect(NetworkIndicator, mapStateToProps);

