/**
 * This is tornado.cash airdrop for early adopters. In order to claim your TORN token please follow https://tornado.cash/airdrop
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "./ENS.sol";

contract Voucher is ERC20("TornadoCash voucher for early adopters", "vTORN"), EnsResolve {
  using SafeERC20 for IERC20;

  IERC20 public immutable torn;
  uint256 public immutable expiresAt;
  address public immutable governance;
  mapping(address => bool) public allowedTransferee;

  struct Recipient {
    address to;
    uint256 amount;
  }

  constructor(
    bytes32 _torn,
    bytes32 _governance,
    uint256 _duration,
    Recipient[] memory _airdrops
  ) public {
    torn = IERC20(resolve(_torn));
    governance = resolve(_governance);
    expiresAt = blockTimestamp().add(_duration);
    for (uint256 i = 0; i < _airdrops.length; i++) {
      _mint(_airdrops[i].to, _airdrops[i].amount);
      allowedTransferee[_airdrops[i].to] = true;
    }
  }

  function redeem() external {
    require(blockTimestamp() < expiresAt, "Airdrop redeem period has ended");
    uint256 amount = balanceOf(msg.sender);
    _burn(msg.sender, amount);
    torn.safeTransfer(msg.sender, amount);
  }

  function rescueExpiredTokens() external {
    require(blockTimestamp() >= expiresAt, "Airdrop redeem period has not ended yet");
    torn.safeTransfer(governance, torn.balanceOf(address(this)));
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal override {
    super._beforeTokenTransfer(from, to, amount);
    require(to == address(0) || from == address(0) || allowedTransferee[from], "ERC20: transfer is not allowed");
  }

  function blockTimestamp() public view virtual returns (uint256) {
    return block.timestamp;
  }
}
