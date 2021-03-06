pragma solidity ^0.5.0;

import "./ERC20.sol";

contract FaucetToken is ERC20 {
    string public name = "FaucetToken";
    string public symbol = "FAT";
    uint public decimals = 18;
    
    uint256 public faucetMax;
    uint256 public faucetFee;
    address payable public boss;

    constructor() public {
      boss = msg.sender;
      faucetFee = 0 ether;
      faucetMax = 1000 * 10**18; // Initial max of 1,000 FAT per mint request
    }

    function getMeSome(uint256 requestValue) public payable {
      require(msg.value == faucetFee, "no_fee");
      require(requestValue <= faucetMax, "too_much");
      _mint(msg.sender, requestValue);
    }

    function burnMine(uint256 burnValue) public {
      _burn(msg.sender, burnValue);
    }

    function changeMax(uint256 newMax) public onlyBoss() {
      faucetMax = newMax;
    }

    function changeFee(uint256 newFee) public onlyBoss() {
      faucetFee = newFee;
    }

    function changeBoss(address payable newBoss) public onlyBoss() {
      boss = newBoss;
    }

    function withdraw() public onlyBoss() {
      boss.transfer(address(this).balance);
    }

    function() external payable {
      require(msg.data.length == 0, "invalid");
    }
    
    modifier onlyBoss() {
      require(msg.sender == boss, "not_boss");
      _;
    }
}
