# This is MukuroShiki's fork.
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("FUJI", "FUJI") {
        // _mint(msg.sender, 10*10**18);
    }

function receiveEnter() external payable {
    _mint(msg.sender, msg.value);
}

}

