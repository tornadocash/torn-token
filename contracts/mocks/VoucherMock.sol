// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "../Voucher.sol";
import "./Timestamp.sol";

contract VoucherMock is Voucher, Timestamp {
  constructor(
    bytes32 _torn,
    bytes32 _governance,
    uint256 _duration,
    Recipient[] memory _airdrops
  ) public Voucher(_torn, _governance, _duration, _airdrops) {}

  function resolve(bytes32 addr) public view override returns (address) {
    return address(uint160(uint256(addr) >> (12 * 8)));
  }

  function blockTimestamp() public view override(Timestamp, Voucher) returns (uint256) {
    return Timestamp.blockTimestamp();
  }
}
