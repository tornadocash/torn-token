// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/Math.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @title Vesting
 * @dev A token holder contract that can release its token balance gradually like a
 * typical vesting scheme, with a cliff and vesting period. Optionally revocable by the
 * owner.
 */
contract Vesting {
  using SafeERC20 for IERC20;
  using SafeMath for uint256;

  uint256 public constant SECONDS_PER_MONTH = 30 days;

  event Released(uint256 amount);
  event BeneficiaryChanged(address newBeneficiary);

  // beneficiary of tokens after they are released
  address public beneficiary;
  IERC20 public immutable token;

  uint256 public immutable cliffInMonths;
  uint256 public immutable startTimestamp;
  uint256 public immutable durationInMonths;
  uint256 public released;

  /**
   * @dev Creates a vesting contract that vests its balance of any ERC20 token to the
   * _beneficiary, monthly in a linear fashion until duration has passed. By then all
   * of the balance will have vested.
   * @param _beneficiary address of the beneficiary to whom vested tokens are transferred
   * @param _cliffInMonths duration in months of the cliff in which tokens will begin to vest
   * @param _durationInMonths duration in months of the period in which the tokens will vest
   */
  constructor(
    address _token,
    address _beneficiary,
    uint256 _startTimestamp,
    uint256 _cliffInMonths,
    uint256 _durationInMonths
  ) public {
    require(_beneficiary != address(0), "Beneficiary cannot be empty");
    require(_cliffInMonths <= _durationInMonths, "Cliff cannot be greater than duration");

    token = IERC20(_token);
    beneficiary = _beneficiary;
    durationInMonths = _durationInMonths;
    cliffInMonths = _cliffInMonths;
    startTimestamp = _startTimestamp == 0 ? blockTimestamp() : _startTimestamp;
  }

  /**
   * @notice Transfers vested tokens to beneficiary.
   */
  function release() external {
    uint256 vested = vestedAmount();
    require(vested > 0, "No tokens to release");

    released = released.add(vested);
    token.safeTransfer(beneficiary, vested);

    emit Released(vested);
  }

  /**
   * @notice Allows beneficiary to change his/her address.
   * @param _beneficiary address of the beneficiary to whom vested tokens are transferred
   */
  function setBeneficiary(address _beneficiary) public {
    require(msg.sender == beneficiary, "Not authorized");
    require(_beneficiary != address(0), "Beneficiary cannot be empty");
    beneficiary = _beneficiary;
    emit BeneficiaryChanged(_beneficiary);
  }

  /**
   * @dev Calculates the amount that has already vested but hasn't been released yet.
   */
  function vestedAmount() public view returns (uint256) {
    if (blockTimestamp() < startTimestamp) {
      return 0;
    }

    uint256 elapsedTime = blockTimestamp().sub(startTimestamp);
    uint256 elapsedMonths = elapsedTime.div(SECONDS_PER_MONTH);

    if (elapsedMonths < cliffInMonths) {
      return 0;
    }

    // If over vesting duration, all tokens vested
    if (elapsedMonths >= durationInMonths) {
      return token.balanceOf(address(this));
    } else {
      uint256 currentBalance = token.balanceOf(address(this));
      uint256 totalBalance = currentBalance.add(released);

      uint256 vested = totalBalance.mul(elapsedMonths).div(durationInMonths);
      uint256 unreleased = vested.sub(released);

      return Math.min(currentBalance, unreleased);
    }
  }

  function blockTimestamp() public view virtual returns (uint256) {
    return block.timestamp;
  }
}
