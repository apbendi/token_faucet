const FaucetNFT = artifacts.require("FaucetNFT");

module.exports = function(deployer) {
    deployer.deploy(FaucetNFT);
};
