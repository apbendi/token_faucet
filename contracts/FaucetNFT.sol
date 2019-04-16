pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract FaucetNFT is ERC721Full {
  uint256 public faucetFee;
  address payable public boss;
  
  constructor() public ERC721Full("FaucetNFT", "FAN") {
    boss = msg.sender;
    faucetFee = 1 ether;
  }

  function gimmeOne() public payable {
    require(msg.value == faucetFee, "no_fee");
    _mint(msg.sender, totalSupply());
  }

  function transferMine(address to, uint256 tokenId) public {
    safeTransferFrom(msg.sender, to, tokenId);
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

  function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        return _tokensOfOwner(owner);
  }

  modifier onlyBoss() {
    require(msg.sender == boss, "not_boss");
    _;
  }
}
