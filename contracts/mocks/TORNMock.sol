// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "../TORN.sol";
import "./Timestamp.sol";

contract TORNMock is TORN, Timestamp {
  uint256 public chainId;

  constructor(
    bytes32 _governance,
    uint256 _pausePeriod,
    Recipient[] memory _vesting
  ) public TORN(_governance, _pausePeriod, _vesting) {}

  function resolve(bytes32 addr) public view override returns (address) {
    return address(uint160(uint256(addr) >> (12 * 8)));
  }

  function setChainId(uint256 _chainId) public {
    chainId = _chainId;
  }

  function chainID() public view override returns (uint256) {
    return chainId;
  }

  function blockTimestamp() public view override(Timestamp, ERC20Permit) returns (uint256) {
    return Timestamp.blockTimestamp();
  }
}
