// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
constructor() ERC20("FUJI", "FUJI") {
\_mint(msg.sender, 10000000000\*10\*\*18);
}

function receiveEnter() external payable {
\_mint(msg.sender, msg.value);
}

mapping (address=>uint) giftlimit;
function gitToken(uint \_result)external {
require(giftlimit[msg.sender]+300<=block.timestamp);//5 分ごと
giftlimit[msg.sender]=block.timestamp;
\_mint(msg.sender,\_result\*10\*\*18);
}

}
