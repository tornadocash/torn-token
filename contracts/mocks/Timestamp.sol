// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Timestamp {
  uint256 public fakeTimestamp;

  function setFakeTimestamp(uint256 _fakeTimestamp) public {
    fakeTimestamp = _fakeTimestamp;
  }

  function blockTimestamp() public view virtual returns (uint256) {
    return fakeTimestamp == 0 ? block.timestamp : fakeTimestamp;
  }
}
