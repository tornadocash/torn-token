// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract ENSMock {
  mapping(bytes32 => address) public registry;

  function resolver(
    bytes32 /* _node */
  ) external view returns (address) {
    return address(this);
  }

  function addr(bytes32 _node) external view returns (address) {
    return registry[_node];
  }

  function setAddr(bytes32 _node, address _addr) external {
    registry[_node] = _addr;
  }

  function multicall(bytes[] calldata data) external returns (bytes[] memory results) {
    results = new bytes[](data.length);
    for (uint256 i = 0; i < data.length; i++) {
      (bool success, bytes memory result) = address(this).delegatecall(data[i]);
      require(success);
      results[i] = result;
    }
    return results;
  }
}
