pragma solidity ^0.5.0;

import "./ERC20.sol";

contract FaucetToken is ERC20 {
    string public name = "FaucetToken";
    string public symbol = "FAT";
    uint public decimals = 2;
    uint public INITIAL_SUPPLY = 0;
    
    uint256 public faucetMax;
    address public boss;

    constructor() public {
      boss = msg.sender;
      faucetMax = 1000;
    }

    function getMeSome(uint256 value) public {
      require(value <= faucetMax, "");
      _mint(msg.sender, value);
    }

    function changeMax(uint256 newMax) public onlyBoss() {
      faucetMax = newMax;
    }

    function changeBoss(address newBoss) public onlyBoss() {
      boss = newBoss;
    }
    
    modifier onlyBoss() {
      require(msg.sender == boss, "Must be the boss");
      _;
    }
}
