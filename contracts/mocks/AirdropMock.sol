// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "../Airdrop.sol";

contract AirdropMock is Airdrop {
  constructor(bytes32 tokenAddress, Recipient[] memory targets) public Airdrop(tokenAddress, targets) {}

  function resolve(bytes32 addr) public view override returns (address) {
    return address(uint160(uint256(addr) >> (12 * 8)));
  }
}
