pragma solidity ^0.5.0;

import "./ERC20.sol";

contract FaucetToken is ERC20 {
    string public name = "FaucetToken";
    string public symbol = "FAT";
    uint public decimals = 2;
    uint public INITIAL_SUPPLY = 0;

    constructor() public { }
}
