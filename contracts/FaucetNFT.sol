pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract FaucetNFT is ERC721Full {  
  constructor() public ERC721Full("FaucetNFT", "FAN") { }

  function gimmeOne() public {
    _mint(msg.sender, totalSupply());
  }

  function transferMine(address to, uint256 tokenId) public {
    safeTransferFrom(msg.sender, to, tokenId);
  }

  function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        return _tokensOfOwner(owner);
  }
}
