pragma solidity ^0.5.0;

import "./ERC20.sol";

contract FaucetToken is ERC20 {
    string public name = "FaucetToken";
    string public symbol = "FAT";
    uint public decimals = 2;
    uint public INITIAL_SUPPLY = 0;
    
    uint256 public faucet_max;
    address boss;

    constructor() public {
      boss = msg.sender;
      faucet_max = 1000;
    }

    function getMeSome(uint256 value) public {
      require(value <= faucet_max, "");
      _mint(msg.sender, value);
    }

    function changeMax(uint256 new_max) public onlyBoss() {
      faucet_max = new_max;
    }

    function changeBoss(address new_boss) public onlyBoss() {
      boss = new_boss;
    }
    
    modifier onlyBoss() {
      require(msg.sender == boss, "Must be the boss");
      _;
    }
}
