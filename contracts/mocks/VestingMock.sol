// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "../Vesting.sol";
import "./Timestamp.sol";

contract VestingMock is Vesting, Timestamp {
  constructor(
    address _token,
    address _beneficiary,
    uint256 _startTimestamp,
    uint256 _cliffInMonths,
    uint256 _durationInMonths
  ) public Vesting(_token, _beneficiary, _startTimestamp, _cliffInMonths, _durationInMonths) {}

  function blockTimestamp() public view override(Timestamp, Vesting) returns (uint256) {
    return Timestamp.blockTimestamp();
  }
}
