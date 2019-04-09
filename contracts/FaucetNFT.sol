pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract FaucetNFT is ERC721Full {  
  constructor() public ERC721Full("FaucetNFT", "FAN") { }
}
